import $ from 'jquery'

$.fn.randomize = function(selector: HTMLSelectElement){
  (selector ? this.find(selector) : this).parent().each(function(){
    // @ts-ignore
    $(this).children(selector).sort(function(){
      return Math.random() - 0.5;
    }).detach().appendTo(this);
  });
  
  return this;
};

export default $;