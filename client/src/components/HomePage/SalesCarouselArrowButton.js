import React, { useCallback, useEffect, useState } from 'react'
import styles from './ComponentCss/Salescarousel.module.css'

// Hook to manage previous/next buttons
export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

// PrevButton Component
export const PrevButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className={styles.embla__button + ' ' + styles.embla__buttonPrev}
      type="button"
      {...restProps}
    >
      <div className="rounded-full bg-gray-100 w-11 h-11 flex justify-center items-center" viewBox="0 0 532 532">
        <img src="/assets/Salescarousel/leftArrow.svg" alt="Left Arrow"/>
      </div>
      {children}
    </button>
  )
}

// NextButton Component
export const NextButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className={styles.embla__button + ' ' + styles.embla__buttonNext}
      type="button"
      {...restProps}
    >
      <div className="rounded-full bg-gray-100 w-11 h-11 flex justify-center items-center" viewBox="0 0 532 532">
      <img src="/assets/Salescarousel/rightArrow.svg" alt="Left Arrow" />
      </div>
      {children}
    </button>
  )
}
