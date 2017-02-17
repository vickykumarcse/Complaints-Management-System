class JavascriptsController < ApplicationController
 def dynamic_states
  @states = Ward.find(:all)
end
end
