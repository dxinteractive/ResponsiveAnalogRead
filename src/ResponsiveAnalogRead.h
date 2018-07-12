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
        void pin(int pin) {
            pinMode(pin, INPUT);
            _pin = pin;
        }

        void noisefloor(int noisefloor) {
            this->noisefloor((float)noisefloor);
        }

        void noisefloor(float noisefloor) {
            _noisefloor = noisefloor;
            //_snap = 1.0 / (float)noisefloor;
        }

        void smooth(bool enable = true) {
            _smooth = enable;
        }

        void smooth(float snap) {
            //_snap = snap;
            _smooth = true;
        }

        void quick(bool enable = true) {
            _quick = enable;
        }

        void settle(bool enable = true) {
            _settle = enable;
        }

        void doubleRead(bool enable = true) {
            _doubleRead = enable;
        }

        void read() {
            if(_doubleRead) analogRead(_pin);
            read((float)analogRead(_pin));
        }

        void read(int value) {
            read((float)value);
        }

        void read(float value) {
            _prevOutput = _output;
            _input = value;
            if(!_hasRead) {
                _output = value;
                _hasRead = true;
                return;
            }
            if(!_hasReadTwice) {
                _hasReadTwice = true;
            }
            _calculate();
        }

        bool hasChanged() {
            return !_hasReadTwice || _prevOutput != _output;
        }

        int raw() {
            return (int)_input;
        }

        float rawFloat() {
            return _input;
        }

        int value() {
            return (int)_output;
        }

        float valueFloat() {
            return _output;
        }

    private:
        int _pin;

        bool _smooth;
        bool _quick;
        bool _settle;
        bool _doubleRead;

        float _input;
        float _output;
        float _noisefloor;
        float _prevOutput;

        bool _hasRead = false;
        bool _hasReadTwice = false;

        void _calculate() {
            float diff = _output - _input;
            if(diff < 0.0) {
                diff = -diff;
            }

            if(!_smooth || (_quick && diff >= _noisefloor)) {
                _output = _input;
                return;
            }
            float snap =_snapCurve(diff * 0.01 / _noisefloor);
            _output = _output + (_input - _output) * snap;
        }

        float _snapCurve(float x) {
            float y = 1.0 / (x + 1.0);
            y = (1.0 - y) * 2.0;
            if(y > 1.0) {
                return 1.0;
            }
            return y;
        }
};

#endif
