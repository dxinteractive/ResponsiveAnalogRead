// @flow

let render = ({instanciations, setup, reads, values}) => `#include <Arduino.h>
#include <ResponsiveAnalogRead.h>

${instanciations}

void setup() {
  Serial.begin(9600);${setup}
}

void loop() {
${reads}

${values}

  // more code here...
  // optional delay
  delay(10);
}`;

type Props = {
    amount: number,
    noisefloor: number,
    smooth: boolean,
    quick: boolean,
    settle: boolean,
    pin: boolean
};

export default ({amount, noisefloor, smooth, quick, settle, pin}: Props): string => {
    let instances = Array(amount || 0)
        .fill(null)
        .map((u, index) => index + 1);

    let instanciations = instances
        .map(key => `ResponsiveAnalogRead analog${key};`)
        .join("\n");

    let renderSetup = (key) => [
        pin && `analog${key}.pin(A${key})`,
        noisefloor && `analog${key}.noisefloor(${noisefloor});`,
        smooth && `analog${key}.smooth();`,
        quick && `analog${key}.quick();`,
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
        .map(key => `  Serial.print("Analog${key} value: ");\n  Serial.println(analog${key}.value());`)
        .join("\n");

    return render({
        instanciations,
        setup,
        reads,
        values
    });
};
