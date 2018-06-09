// fake Arduino.h!
// https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/embind.html#embind-val-guide

unsigned long millis() {
    return 1;
}
