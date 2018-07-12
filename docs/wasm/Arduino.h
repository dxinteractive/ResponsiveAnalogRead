#ifndef STUBBED_ARDUINO_H
#define STUBBED_ARDUINO_H

//
// setters to be called from Javascript
//

unsigned long _millis;

void setMillis(unsigned long millis) {
    _millis = millis;
}

int _analogReadValue;

void setAnalogReadValue(int value) {
    _analogReadValue = value;
}

//
// fake arduino.h functions
//

unsigned long millis() {
    return _millis;
}

int analogRead(int pin) {
    return _analogReadValue;
}

void pinMode(int pin, int mode) {}

int INPUT = 0;

#endif
