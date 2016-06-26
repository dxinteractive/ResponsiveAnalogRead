#ResponsiveAnalogRead

ResponsiveAnalogRead is an Arduino library for eliminating noise in analogRead inputs without decreasing responsiveness. It sets out to achieve the following:

1. Be able to reduce large amounts of noise when reading a signal. So if a voltage is unchanging aside from noise, the values returned should never change due to noise alone.
2. Be extremely responsive (i.e. not sluggish) when the voltage changes quickly.
3. Also be responsive when a voltage stops changing - the values returned must stop changing almost immediately after.
4. The returned values must avoid 'jumping' up several numbers at once, especially when the input signal changes very slowly. It's better to transition smoothly as long as that smooth transition does not take too long.

##How to install

In the Arduino IDE, go to Sketch > Include libraries > Manage libraries, and search for ResponsiveAnalogInput.
You can also just use the files directly from the src folder.

Look at the example in the examples folder for an idea on how to use it in your own projects.
The source files are also heavily commented, so check those out if you want fine control of the library's behaviour.

##How to use

Here's a basic example:

```Arduino
#include <ResponsiveAnalogRead.h>

const int ANALOG_PIN = A0;
ResponsiveAnalogRead analog(ANALOG_PIN, true);

void setup() {
  Serial.begin(9600);
}

void loop() {
  // update the ResponsiveAnalogRead object every loop
  analog.update();

  Serial.print(analog.getRawValue());
  Serial.print("\t");
  Serial.print(analog.getValue());
  
  // if the repsonsive value has change, print out 'changed'
  if(analog.hasChanged()) {
    Serial.print("\tchanged");
  }
  
  Serial.println("");
  delay(20);
}
```

##Methods for usage

- `int getValue() // get the responsive value from last update`
- `int getRawValue() // get the raw analogRead() value from last update`
- `bool hasChanged() // returns true if the responsive value has changed during the last update`
- `void update(); // updates the value by performing an analogRead() and calculating a responsive value based off it`

##Settings

###Sleep

- `void enableSleep()`
- `void disableSleep()`

Sleep allows increasingly small changes in the output value to be ignored, so instead of having the responsiveValue slide into position over a couple of seconds, it stops when it's "close enough". It's enabled by default. Here's a summary of how it works:

```
1. "Sleep" is when the output value decides to ignore increasingly small changes.
2. When it sleeps, it is less likely to start moving again, but a large enough nudge will wake it up and begin responding as normal.
3. It classifies changes in the input voltage as being "active" or not, so it can set a timer and tell when it hasn't been sufficiently active for a while. That lack of activity can tell it to sleep.
4. It requires different thresholds of movement for both sleep and awake states, which defines just how much movement needs to occur to count as being "active".
```

It's behaviour can be modified with the following methods:
- `void enableEdgeSnap() // edge snap ensures that values at the edges of the spectrum (0 and 1023) can be easily reached when sleep is enabled`
- `void setSleepDelay(unsigned int ms) // sets the amount of time before sleeping
- `void setSleepActivityThreshold(unsigned int newThreshold) // the amount of movement that must take place while asleep for it to register as activity and start moving the output value. Defaults to 20.`
- `void setAwakeActivityThreshold(unsigned int newThreshold) // the amount of movement that must take place while awake for it to register as activity, and reset the timer before sleep occurs. Defaults to 5.`

###Snap multiplier

- `void setSnapMultiplier(float newMultiplier)`

SnapMultiplier is a value from 0 to 1 that controls the amount of easing. Increase this to lessen the amount of easing (such as 0.1) and make the responsive values more responsive, but doing so may cause more noise to seep through when sleep is not enabled.

###Analog resolution
- `void setAnalogResolution(unsigned int resolution)`

If your ADC is something other than 10bit (1024), set that using this

##Further functionality
See ResponsiveAnalogRead.h for details on any remaining functionality it provides.

Damien Clarke, 2016
