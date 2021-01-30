
// TODO: give a better name for this
import $ from 'jquery'
const wdipitt = $('#whydidiputinthisthing');
const bgNotice = $('#backgroundOnlyNotice')
const main = $('main');
let tempDisableChen = true;

$(() => {
  $('#chen').on('click', function(e) {
    if (e.ctrlKey) {
      bgNotice.fadeIn(400)
      
      tempDisableChen = true;
      setTimeout(() => {
        
        tempDisableChen = false
        bgNotice.fadeOut(400)
      },1100)
      return wdipitt.fadeOut(200)
    }
    $("links").randomize("button");
  });
  
  let isMouseDown = false
  $("#chen").on('mousedown', (e) => {
    isMouseDown = true;
    setTimeout(() => {
      if (isMouseDown) {
        bgNotice.fadeIn(400)
        setTimeout(() => {
          bgNotice.fadeOut(400)
        },1100)
        return wdipitt.fadeOut(200)
      }
    }, 1000)
  })
  
  $("#chen").on('mouseup', (e) => {
    isMouseDown = false
  })
  function fadeIn(e: any) {
    wdipitt.fadeIn(200)
  }
  
  main.on('mousedown', (e) => {
    if (tempDisableChen === true) return;
    fadeIn(e)
  });
  
  $(document).on('keydown', (e) => {
    
    if (tempDisableChen === true) return;
    if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;
    fadeIn(e)
  });
})
