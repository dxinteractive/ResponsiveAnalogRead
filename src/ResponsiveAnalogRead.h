/*
 * ResponsiveAnalogRead.h
 * Arduino library for reducing noise from analog readings without decreasing responsiveness
 *
 * Copyright (c) 2018 Damien Clarke
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
**/

#ifndef RESPONSIVE_ANALOG_READ_H
#define RESPONSIVE_ANALOG_READ_H

#include <Arduino.h>

class ResponsiveAnalogRead
{
    public:
        ResponsiveAnalogRead() {}

        int pin() {
            return _pin;
        }

        void setPin(int pin) {
            _pin = pin;
        }

        int min() {
            return _min;
        }

        void setMin(int min) {
            _min = min;
        }

        int max() {
            return _max;
        }

        void setMax(int max) {
            _max = max;
        }

        void read() {
            int value = analogRead(_pin);
            _input = value;
            _output = value;
        }
        //void read(int value);
        bool hasChanged() {
            return true;
        }

        int raw() {
            return _input;
        }

        int value() {
            return _output;
        }

    private:
        int _pin;
        int _min = 0;
        int _max = 1023;
        int _input;
        int _output;
};

#endif
