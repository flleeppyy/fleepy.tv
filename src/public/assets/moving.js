window.initChenMoving = () => {
  /**
   * Settings
   * -------------------
   *
   * Base settings owo
   */

  // Image of Chen facing left
  const chen = "assets/images/chenrun.gif"

  // Image of Chen facing right
  const chenRight = "assets/images/chenrunright.gif"

  // Getter of Chen - only id and class identifiers accepted (defaults to id)
  const identifier = ".honk"

  // Max % of the CSS right property
  const maxThing = 94

  /**
   * Chen
   * ------------
   *
   * honk honk
   */

  const honk = identifier.startsWith(".")
    ? document.getElementsByClassName(identifier.substring(1))[0]
    : document.getElementById(identifier.substring(1))
  if (!honk) return // if Chen isn't present life doesn't make sense

  /**
   * Chen state
   * ------------------
   *
   * Main state of Chen, like position and side
   */

  // "Thing" is like a position, works on both right and left CSS property
  // It's actually %, don't tell anyone tho
  let currentThing = 0

  // current side (either top or bottom - bottom is default)
  let currentSide = "bottom"

  // @deprecated remove
  let currentTop = Number.parseInt(honk.style.top)

  /**
   * Actions state
   * --------------------
   *
   * In some cases it is important to know
   * if some action isn't performing.
   *
   */

  // If key is going down
  // Important for up and down keys to not interfere
  let keyDown = false

  // If Chen is going down / up
  // Important if Chen is going down not to interfere by
  // pressing up at the same time, and vice versa.
  let goingUp = false
  let goingDown = false

  /**
   * Helper functions
   * -------------------
   *
   * Helper functions do some helpful things
   * (like calculating, etc..) - to reduce boilerplate
   */

  /**
   * JS gives you the real height of the gif,
   * but we want the one after scaling through CSS (scaled to 0.4)
   */
  const getActualHeight = () => (honk.height / 100) * 0.4 * 100

  /**
   * Getters
   */

  /**
   * Get the current position of Chen
   * @returns {(string | null)} "right" | "left" | null
   */
  const getPosition = () => {
    const right = honk.style.right
    const left = honk.style.left

    if (!right) return "left"
    if (!left) return "right"

    return null
  }

  /**
   * Returns Chen image link based on the current side
   * and navigation direction (only "right" or "left" - defaults to "left")
   * @param {string} direction the navigation direction (only "right" or "left")
   * @returns {string} the URL
   */
  const getImageLink = (direction) => {
    return direction === "right"
      ? // Handling direction right
        currentSide === "top"
        ? chen // Chen on top going in right direction is facing left (because inverted)
        : chenRight // Chen on bottom going in right direction is facing right
      : // Handling direction left
      currentSide === "top"
      ? chenRight // Chen on top going in left direction is facing right (because inverted)
      : chen // Chen on bottom going in left direction is facing left
  }

  /**
   * Setters
   */

  /**
   * Sets the "thing" and updates the CSS properties
   * @param {number} val New thing value
   */
  const setThing = (val) => {
    // TODO: do this with CSS animations instead of
    // for-looping tenths, we can do better than this
    for (let i = 0.1; i < val; i += 0.4) {
      if (!keyDown) return

      getPosition() === "left"
        ? (honk.style.left = `${i}%`)
        : (honk.style.right = `${i}%`)
      currentThing = i
    }
  }

  /**
   * Sets the side Chen is currently at and modifies the classes accordingly
   * Accepts only "top" and "bottom", defaults to "bottom"
   * @param {string} side either "top" | "bottom"
   */
  const setSide = (side) => {
    side = side === "top" ? "top" : "bottom"

    currentSide = side
    honk.classList.add(side === "top" ? "brr-left" : "brr-right")
    honk.classList.remove(side === "top" ? "brr-right" : "brr-top")
  }

  /**
   * Default initialization
   * --------------------------
   *
   * Set things to default values
   */

  // Set side to default bottom
  setSide("bottom")

  // When activated, we want Chen to show up, so set thing to 0
  setThing(0)

  /**
   * Events
   * -------------------
   *
   * Key events, handled through jQuery
   * Debounced to not trigger the events as much
   */

  /**
   * Key up event
   * -------------------
   *
   * This event is in place because if the user is holding
   * the right or left key and we don't want to continue the animation
   * once the key has been lifted
   */
  $("body").keyup(
    _.debounce(
      (e) => {
        // Setting the keyDown to false (previously set to true by the keydown event)
        keyDown = false
      },
      60,
      { maxWait: "180" }
    )
  )

  /**
   * Key down event
   * ------------------
   *
   * The main keydown event
   */
  $("body").keydown(
    _.debounce(
      (e) => {
        // Setting the keyDown to true (keyup event will set this to false to cancel out any running keydown things)
        keyDown = true

        // If this isn't an arrow key then just ignore it
        if (
          !(
            e.keyCode === 37 ||
            e.keyCode === 38 ||
            e.keyCode === 39 ||
            e.keyCode === 40
          )
        )
          return

        // This shouldn't ever happen, as by default
        // "thing" is already set to 0, but real life is still
        // real life and vanilla JS still sucks ass
        if (currentThing < 0) setThing(0)

        //
        switch (e.keyCode) {
          // Handling the left arrow key
          case 37:
            // Setting the Image link
            $(honk).attr("src", getImageLink("left"))

            // We do not want to cross the beginning of
            // the screen, so set only if it's less than set value
            if (!(currentThing + 1 >= maxThing)) {
              setThing(currentThing + 2)
            }
            break
          // Handling the right arrow key
          case 39:
            // To make sure that user is not going right and thing is less than 0 meaning
            // Chen is not seen on the screen
            if (currentThing < 0) return

            // Setting the Image link
            $(honk).attr("src", getImageLink("right"))

            // We do not want to cross the end of
            // the screen, so set only if it's less than 0
            if (!(currentThing + 1 < 0)) {
              setThing(currentThing - 2)
            }
            break
          // Handling the up arrow key
          case 38:
            // Do not handle if Chen is already
            // going down or up, or if the side is bottom
            if (goingDown || goingUp) return
            if (!currentSide === "bottom") return

            // Lock up/down actions
            goingUp = true

            // Calculate the margin required in order to animate leave of Chen
            const h = getActualHeight() + 5

            // Set the value to both margins
            // to make sure the animation is on both sides
            // The number is inverted as Chen's leaving
            honk.style.marginTop = h - h * 2
            honk.style.marginBottom = h - h * 2

            setTimeout(() => {
              // Setting the side to bottom
              setSide("bottom")

              // Setting the margins to 0,
              // to animate Chen showing back again on the bottom side
              honk.style.marginTop = 0
              honk.style.marginBottom = 0

              // Unlock up/down actions after Chen shows up
              setTimeout(() => (goingUp = false), 600) // it takes 0.6 seconds (=600 ms) to animate
            }, 600)

            break
          // Handling the down arrow key
          case 40:
            // Do not handle if Chen is already
            // going down or up, or if the side is top
            if (goingDown || goingUp) return
            if (!currentSide === "top") return

            // Lock up/down actions
            goingDown = true

            const height = getActualHeight() + 5
            honk.style.marginTop = height - height * 2
            honk.style.marginBottom = height - height * 2

            setTimeout(() => {
              // Setting the side to top
              setSide("top")

              // Setting the margins to 0,
              // to animate Chen showing back again on the bottom side
              honk.style.marginBottom = 0
              honk.style.marginTop = 0

              // Unlock up/down actions after Chen shows up
              setTimeout(() => (goingDown = false), 600) // it takes 0.6 seconds (=600 ms) to animate
            }, 600)

            break

          // This shouldn't happen, but just making sure
          default:
            return
        }
      },
      60,
      { maxWait: "180" }
    )
  )
}
