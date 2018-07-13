// @flow

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

type Props = {
    amount: number,
    noisefloor: number,
    glide: number,
    smooth: boolean,
    settle: boolean,
    pin: boolean
};

export default ({amount, noisefloor, smooth, glide, delay, settle, pin}: Props): string => {
    let instances = Array(amount || 0)
        .fill(null)
        .map((u, index) => index + 1);

    let instanciations = instances
        .map(key => `ResponsiveAnalogRead analog${key};`)
        .join("\n");

    let renderSetup = (key) => [
        pin && `analog${key}.pin(A${key})`,
        noisefloor && `analog${key}.noisefloor(${noisefloor.toFixed(1)});`,
        glide && `analog${key}.glide(${glide.toFixed(1)});`,
        smooth && `analog${key}.smooth();`,
        settle && `analog${key}.settle();`
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
