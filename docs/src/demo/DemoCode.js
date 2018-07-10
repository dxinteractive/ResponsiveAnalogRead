// @flow

const DEMO_CODE = `#include <Arduino.h>
#include <ResponsiveAnalogRead.h>

ResponsiveAnalogRead analog1;
analog1.pin(A0);
analog1.smooth(10);
analog1.quick();
analog1.settle();

void setup() {
  Serial.begin(9600);
}

void loop() {
  analog1.update();
  Serial.println(analog.value());
  // more code here...
  delay(10);
}`;

export default () => DEMO_CODE;
