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

        void noiseFloor(int value) {
            this->noiseFloor((float)value);
        }

        void noiseFloor(float value) {
            _noiseFloor = value;
            _updateSmoothTensionAdjusted();
        }

        void glide(float amount = 1.0) {
            _glide = amount;
            _glideTension = _toTension(amount * 5.0);
        }

        void smooth(float amount = 1.0) {
            _smooth = amount;
            _smoothTension = _toTension(amount * 10.0);
            _updateSmoothTensionAdjusted();
        }

        void settle(float amount = 1.0) {
            _settle = amount;
            _settleTension = _toTension(amount);
        }

        void doubleRead(bool enable = true) {
            _doubleRead = enable;
        }

        void read() {
            if(_doubleRead) {
                analogRead(_pin);
            }
            read((float)analogRead(_pin));
        }

        void read(int value) {
            read((float)value);
        }

        void read(float value) {
            _prevOutput = _output;
            _input = value;
            if(_reads == 0) {
                _output = value;
                _reads++;
                return;
            }
            if(_reads == 1) {
                _reads++;
            }
            _updateOutput();
        }

        bool hasChanged() {
            return _reads < 2 || _prevOutput != _output;
        }

        bool isAboveNoiseFloor() {
            return _isAboveNoiseFloor;
        }

        bool isSettled() {
            return _isSettled;
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
        // config
        int _pin;
        bool _doubleRead;

        // state
        float _input;
        float _output;
        float _prevOutput;
        int _reads;

        // algorithm params
        float _noiseFloor;
        float _smooth;
        float _smoothTension = 1.0;
        float _smoothTensionAdjusted = 1.0;
        float _glide;
        float _glideTension = 1.0;
        float _settle;
        float _settleTension = 1.0;
        float _settleError = 0.0;
        bool _isAboveNoiseFloor;
        bool _isSettled;

        float _toTension(float amount) {
            return 1.0 / (amount + 1.0);
        }

        void _updateSmoothTensionAdjusted() {
            if(_noiseFloor > 0.0) {
                _smoothTensionAdjusted = _smoothTension / _noiseFloor;
            }
        }

        void _updateOutput() {
            float diff = _abs(_output - _input);

            _isAboveNoiseFloor = diff > _noiseFloor * 3.0;

            if(_settle > 0.0) {
                _settleError += (diff - _settleError) * _settleTension;
                _isSettled = _abs(_settleError) < _noiseFloor;
            } else {
                _isSettled = false;
            }

            float tension = _tensionCurve(diff * _smoothTensionAdjusted);
            if(_glide > 0.0 && _glideTension < tension) {
                tension = _glideTension;
            }

            _output = _output + (_input - _output) * tension;
        }

        float _tensionCurve(float x) {
            float y = 1.0 / (x + 1.0);
            y = (1.0 - y) * 2.0;
            if(y > 1.0) {
                return 1.0;
            }
            return y;
        }

        float _abs(float value) {
            if(value < 0.0) {
                return -value;
            }
            return value;
        }
};

#endif
