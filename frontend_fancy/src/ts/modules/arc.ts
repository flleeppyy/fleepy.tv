export default (): void => {
  const setArcZI = setInterval(() => { 
    const f = () =>{
      $("#arc-widget-container").attr("style", `${$("#arc-widget-container").attr("style")} z-index:2!important;`);
    };
    if ($("#arc-widget-container").length > 0) {
      setTimeout(()=>{
        f();
        return clearInterval(setArcZI);
      }, 300);
    }
    f();
  }, 50);
  return;
};