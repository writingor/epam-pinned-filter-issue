/**
 * This is only a demonstration,
 * NOT a real solution to the issue.
 *
 * Actually, we should update the source HTML, CSS,
 * and add a small script in JS to update the height
 * of .pinned-filter__spacer based on .pinned-filter 
 * when it's not in position: fixed.
 * 
 */
(() => {
    /**
     * Prepare selectors
     */
    const 
        className = 'pinned-filter', 
        mod = '--fixed',
        filter = document.querySelector(`.${className}`)

    /**
     * Check if element found
     */
    if (!filter) { return }

    /**
     * Transition duration
     */
    const duration = 400

    /**
     * Prepare HTML and
     * Wrap components for correct functionality
     */
    const
        container = document.querySelector(`.${className}__always-pinned`),
        spacer = document.querySelector(`.${className}__spacer`),
        wrapper = document.createElement('div')

    wrapper.classList.add(`${className}__wrapper`)

    wrapper.appendChild(spacer)
    wrapper.appendChild(filter)

    container.prepend(wrapper)

    /**
     * Define props and state
     */
    let
        isFixed,
        fixedUpdate,
        fixedUpdatedAt,
        defaultHeight

    const styles = document.createElement('style')

    /**
     * Append style props in HTML-head
     */
    document.head.appendChild(styles)

    /**
     * Define props and state updaters
     */
    const updateHeight = () => {
        if (isFixed) {
            return
        }

        defaultHeight = parseInt(filter.offsetHeight)
    }

    const setState = () => {
        fixedUpdate = filter.classList.contains(`${className}${mod}`)

        if (fixedUpdate !== isFixed) {
            isFixed = fixedUpdate
            fixedUpdatedAt = Date.now()
        }

        if (((Date.now() - fixedUpdatedAt) > duration) || !defaultHeight) {
            updateHeight()
        }
    }

    const setStyles = () => {
        styles.innerHTML = `
            .${className}__wrapper {
                position: relative;
            }

            .${className}__spacer {
                display: block !important;
                height: ${defaultHeight}px !important;
                transition: height ease-in-out ${duration}ms;
            }

            .${className}__spacer[style="height: 250px;"] {
                height: 0 !important;
            }

            .${className} {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: ${defaultHeight}px;
                transition: height ease-in-out ${duration}ms;
                background: transparent !important;
            }

            .${className} .${className}-height-marker {
                position: relative;
            }

            .${className} .${className}-height-marker::before {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                height: calc(100% + 1.6rem);
                width: 100vw;
                transform: translateX(-50%);
                transition: background ease-in-out ${duration}ms;
            }

            .${className}--fixed {
                position: fixed;
                height: 0;
                padding-bottom: 0 !important;
                transition: all ease-in-out ${duration}ms;
            }

            .${className}--fixed .${className}-height-marker::before {
                background: rgba(242, 242, 242, 1) !important; /** alpha tuned from .9 to 1 */
            }
        `
    }

    const update = () => {
        setState()
        setStyles()
    }

    /**
     * Update
     */
    update()
    window.addEventListener('scroll', update)
    window.addEventListener('resize', update)
})()
