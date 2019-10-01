#include <emscripten/bind.h>
using namespace emscripten;

#include "../../src/ResponsiveAnalogRead.h"
#include "./Arduino.h"

EMSCRIPTEN_BINDINGS(my_class_example) {
  class_<ResponsiveAnalogRead>("ResponsiveAnalogRead")
    .constructor()
    .function("pin", &ResponsiveAnalogRead::pin)
    .function("noiseFloor", select_overload<void(double)>(&ResponsiveAnalogRead::noiseFloor))
    .function("noiseFloor_int", select_overload<void(int)>(&ResponsiveAnalogRead::noiseFloor))
    .function("glide", &ResponsiveAnalogRead::glide)
    .function("smooth", &ResponsiveAnalogRead::smooth)
    .function("settle_int", select_overload<void(int, int)>(&ResponsiveAnalogRead::settle))
    .function("settle_double", select_overload<void(double, int)>(&ResponsiveAnalogRead::settle))
    .function("doubleRead", &ResponsiveAnalogRead::doubleRead)
    .function("read", select_overload<void()>(&ResponsiveAnalogRead::read))
    .function("read_int", select_overload<void(int)>(&ResponsiveAnalogRead::read))
    .function("read_double", select_overload<void(double)>(&ResponsiveAnalogRead::read))
    .function("hasChanged", &ResponsiveAnalogRead::hasChanged)
    .function("isSettled", &ResponsiveAnalogRead::isSettled)
    .function("raw", &ResponsiveAnalogRead::raw)
    .function("rawDouble", &ResponsiveAnalogRead::rawDouble)
    .function("value", &ResponsiveAnalogRead::value)
    .function("valueDouble", &ResponsiveAnalogRead::valueDouble)
    .function("tension", &ResponsiveAnalogRead::tension)
  ;
  function("setMillis", &setMillis);
  function("setAnalogReadValue", &setAnalogReadValue);
}
