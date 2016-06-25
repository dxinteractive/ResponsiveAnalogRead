/*
 * ResponsiveAnalogRead.h
 * Arduino library for eliminating noise in analogRead inputs without decreasing responsiveness
 *
 * Copyright (c) 2016 Damien Clarke
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
 */
 
#ifndef RESPONSIVE_ANALOG_READ_H
#define RESPONSIVE_ANALOG_READ_H

#include <Arduino.h>

class ResponsiveAnalogRead
{
  public:
    
    ResponsiveAnalogRead(int pin, bool sleepEnable, float snapMultiplier = 0.01);

    inline int getValue() { return responsiveValue; }
    inline int getRawValue() { return rawValue; }
    inline bool hasChanged() { return responsiveValueHasChanged; }
    void update();

    void setSnapMultiplier(float newMultiplier);
    inline void enableSleep() { sleepEnable = true; }
    inline void disableSleep() { sleepEnable = false; }
    inline void setSleepDelay(unsigned int ms) { sleepDelayMS = ms; }
    inline void setSleepActivityThreshold(unsigned int newThreshold) { sleepActivityThreshold = newThreshold; }
    inline void setAwakeActivityThreshold(unsigned int newThreshold) { awakeActivityThreshold = newThreshold; }
    inline void setAnalogResolution(unsigned int resolution) { analogResolution = resolution; }

  private:
    int pin;
    unsigned int analogResolution = 1024;
    float snapMultiplier;
    bool sleepEnable;
    unsigned int sleepDelayMS;
    unsigned int sleepActivityThreshold = 20;
    unsigned int awakeActivityThreshold = 5;

    float smoothValue;
    unsigned long lastActivityMS;
    bool sleeping = false;

    int rawValue;
    int responsiveValue;
    int prevResponsiveValue;
    bool responsiveValueHasChanged;

    int getResponsiveValue(int newValue);
    float snapCurve(float x);
};

#endif
