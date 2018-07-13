#include <emscripten/bind.h>
using namespace emscripten;

#include "../../src/ResponsiveAnalogRead.h"
#include "./Arduino.h"

EMSCRIPTEN_BINDINGS(my_class_example) {
  class_<ResponsiveAnalogRead>("ResponsiveAnalogRead")
    .constructor()
    .function("pin", &ResponsiveAnalogRead::pin)
    .function("noisefloor", select_overload<void(int)>(&ResponsiveAnalogRead::noisefloor))
    .function("noisefloor_float", select_overload<void(float)>(&ResponsiveAnalogRead::noisefloor))
    .function("glide", &ResponsiveAnalogRead::glide)
    .function("smooth", &ResponsiveAnalogRead::smooth)
    .function("settle", &ResponsiveAnalogRead::settle)
    .function("doubleRead", &ResponsiveAnalogRead::doubleRead)
    .function("read", select_overload<void()>(&ResponsiveAnalogRead::read))
    .function("read_int", select_overload<void(int)>(&ResponsiveAnalogRead::read))
    .function("read_float", select_overload<void(float)>(&ResponsiveAnalogRead::read))
    .function("hasChanged", &ResponsiveAnalogRead::hasChanged)
    .function("raw", &ResponsiveAnalogRead::raw)
    .function("rawFloat", &ResponsiveAnalogRead::rawFloat)
    .function("value", &ResponsiveAnalogRead::value)
    .function("valueFloat", &ResponsiveAnalogRead::valueFloat)
  ;
  function("setMillis", &setMillis);
  function("setAnalogReadValue", &setAnalogReadValue);
}
