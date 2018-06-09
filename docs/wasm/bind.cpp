#include <emscripten/bind.h>
using namespace emscripten;

#include "../../src/ResponsiveAnalogRead.h"

EMSCRIPTEN_BINDINGS(my_class_example) {
  class_<ResponsiveAnalogRead>("ResponsiveAnalogRead")
    .constructor()
    .function("read", &ResponsiveAnalogRead::read)
    .function("hasChanged", &ResponsiveAnalogRead::hasChanged)
    .function("raw", &ResponsiveAnalogRead::raw)
    .function("value", &ResponsiveAnalogRead::value)
  ;
}
