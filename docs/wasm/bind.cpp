#include <emscripten/bind.h>
using namespace emscripten;

#include "../../src/ResponsiveAnalogRead.h"
#include "./Arduino.h"

EMSCRIPTEN_BINDINGS(my_class_example) {
  class_<ResponsiveAnalogRead>("ResponsiveAnalogRead")
    .constructor()
    .function("pin", &ResponsiveAnalogRead::pin)
    .function("setPin", &ResponsiveAnalogRead::setPin)
    .function("min", &ResponsiveAnalogRead::min)
    .function("setMin", &ResponsiveAnalogRead::setMin)
    .function("max", &ResponsiveAnalogRead::max)
    .function("setMax", &ResponsiveAnalogRead::setMax)
    .function("read", &ResponsiveAnalogRead::read)
    .function("hasChanged", &ResponsiveAnalogRead::hasChanged)
    .function("raw", &ResponsiveAnalogRead::raw)
    .function("value", &ResponsiveAnalogRead::value)
  ;
  function("setMillis", &setMillis);
  function("setAnalogReadValue", &setAnalogReadValue);
}
