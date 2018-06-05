#include <emscripten/bind.h>
using namespace emscripten;

#include "../../src/ResponsiveAnalogRead.h"

EMSCRIPTEN_BINDINGS(my_class_example) {
  class_<ResponsiveAnalogRead>("ResponsiveAnalogRead")
    .constructor()
    .function("hello", &ResponsiveAnalogRead::hello)
  ;
}
