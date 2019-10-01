// @flow
import type Parcel from 'parcels-react';

let render = ({instanciations, setup, reads, values, delay}) => `#include <Arduino.h>
#include <ResponsiveAnalogRead.h>

${instanciations}

void setup() {
  Serial.begin(9600);${setup}
}

void loop() {
${reads}

${values}

  // more code here...${delay}
}`;

export default (demoParcel: Parcel): string => {
    let {
        amount,
        noisefloor,
        smoothEnabled,
        glideEnabled,
        settleEnabled,
        doubleReadEnabled,
        smooth,
        glide,
        settleTime,
        settle,
        delay,
        pin
    } = demoParcel.value();

    let glideIsDefault = demoParcel.get('glide').meta().isDefault;
    let smoothIsDefault = demoParcel.get('smooth').meta().isDefault;
    let settleIsDefault = demoParcel.get('settle').meta().isDefault;

    let instances = Array(amount || 0)
        .fill(null)
        .map((u, index) => index + 1);

    let instanciations = instances
        .map(key => `ResponsiveAnalogRead analog${key};`)
        .join("\n");

    let renderSetup = (key) => [
        pin && `analog${key}.pin(A${key})`,
        noisefloor && `analog${key}.noisefloor(${noisefloor.toFixed(1)});`,
        glideEnabled && `analog${key}.glide(${glideIsDefault ? "" : glide.toFixed(1)});`,
        smoothEnabled && `analog${key}.smooth(${smoothIsDefault ? "" : smooth.toFixed(1)});`,
        settleEnabled && `analog${key}.settle(${settleTime.toFixed(0)}${settleIsDefault ? "" : ", " + settle.toFixed(1)});`,
        doubleReadEnabled && `analog${key}.doubleRead();`
    ]
        .filter(ii => ii)
        .map(ii => "  " + ii)
        .join("\n");

    let setup = instances
        .map(renderSetup)
        .join("\n\n");

    if(setup) {
        setup = `\n\n${setup}`;
    }

    let reads = instances
        .map(key => `  analog${key}.read();`)
        .join("\n");

    let values = instances
        .map(key => `  Serial.print("Analog${key} value: ");\n  Serial.println(analog${key}.value());\n  if(analog${key}.hasChanged()) {\n    Serial.println("Analog${key} changed");\n  }`)
        .join("\n\n");

    let delayString = delay ? `\n  delay(${delay});` : ``;

    return render({
        instanciations,
        setup,
        reads,
        values,
        delay: delayString
    });
};
