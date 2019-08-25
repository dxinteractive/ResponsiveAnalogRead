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
            this->noiseFloor((double)value);
            _calculateLowTension();
        }

        void noiseFloor(double value) {
            _noiseFloor = value;
            __lowX = value * 0.5;
            __highX = value * 2.0;
        }

        void glide(double amount = 1.0) {
            _glide = amount;
            __glideTension = _toTension(amount * 5.0);
        }

        void smooth(double amount = 1.0) {
            _smooth = amount;
            __smoothTension = _toTension(amount * 10.0);
            _calculateLowTension();
        }

        void settle(int time, int threshold) {
            settle(time, (double)threshold);
        }

        void settle(int time, double threshold = 1.5) {
            _settleTime = time;
            _settleThreshold = threshold;
        }

        void doubleRead(bool enable = true) {
            _doubleRead = enable;
        }

        void read() {
            if(_doubleRead) {
                analogRead(_pin);
            }
            read((double)analogRead(_pin));
        }

        void read(int value) {
            read((double)value);
        }

        void read(double value) {
            _prevOutputAfterSettle = _outputAfterSettle;
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
            return _reads < 2 || (int)_prevOutputAfterSettle != (int)_outputAfterSettle;
        }

        bool isSettled() {
            return _isSettled;
        }

        int raw() {
            return (int)_input;
        }

        double rawDouble() {
            return _input;
        }

        int value() {
            return (int)_outputAfterSettle;
        }

        double valueDouble() {
            return _outputAfterSettle;
        }

        double tension() {
            return _tension;
        }

    private:
        // config
        int _pin;
        bool _doubleRead;

        // state
        double _input;
        double _output;
        double _outputAfterSettle;
        double _prevOutputAfterSettle;
        double _tension = 1.0;
        int _reads; // 0, 1 or 2
        double _velocity;
        double _velocitySmoothed;
        double _prevVelocity;
        bool _isSettled;
        int _settledFor;

        // algorithm params
        double _noiseFloor;
        double _glide;
        double _smooth;
        double _settleTime;
        double _settleThreshold;

        // precomputed algorithm params
        double __lowX;
        double __highX;
        double __lowTension;
        double __smoothTension = 1.0;
        double __glideTension = 1.0;

        double _toTension(double amount) {
            return 1.0 / (amount + 1.0);
        }

        void _updateOutput() {
            bool glideEnabled = _glide > 0.0;
            bool smoothEnabled = _noiseFloor > 0.0 && _smooth > 0.0;
            bool settleEnabled = _settleThreshold > 0.0;

            _prevVelocity = _velocity;
            _velocity = _output - _input;

            if(smoothEnabled) {
                _ema(_velocitySmoothed, _velocity, 0.25);
                double acceleration = _velocitySmoothed - _prevVelocity;

                double velocityTension;
                _calculateTension(velocityTension, acceleration, __lowX, __highX, __lowTension);
                _ema(_velocitySmoothed, _velocity, velocityTension);
                _calculateTension(_tension, _velocitySmoothed, __lowX, __highX, __lowTension);
            } else {
                _tension = 1.0;
            }

            if(glideEnabled && __glideTension < _tension) {
                _tension = __glideTension;
            }

            _ema(_output, _input, _tension);

            if(settleEnabled) {
                if(_abs(_outputAfterSettle - _output) > _settleThreshold) {
                    _settledFor = 0;
                    _isSettled = false;
                } else {
                    bool isSettled = _settledFor > _settleTime;
                    if(!isSettled) {
                        _settledFor++;
                    }
                    _isSettled = isSettled;
                }
            } else {
                _isSettled = false;
            }

            if(!_isSettled) {
                _outputAfterSettle = _output;
            }
        }

        void _calculateTension(double& tension, double x, double lowX, double highX, double lowTension) {
            x = _abs(x);
            if(x < lowX) {
                tension = lowTension;
            } else {
                double m = (x - lowX) / (highX - lowX);
                tension = m * (1.0 - lowTension) + lowTension;
                if(tension > 1.0) {
                    tension = 1.0;
                }
            }
        }

        void _calculateLowTension() {
            __lowTension = __smoothTension / _noiseFloor;
        }

        void _ema(double& subject, double target, double tension) {
            if(tension == 1.0) {
                subject = target;
            } else {
                subject += (target - subject) * tension;
            }
        }

        double _abs(double value) {
            if(value < 0.0) {
                return -value;
            }
            return value;
        }
};

#endif
