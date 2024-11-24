import React, { useRef, useEffect, useState } from "react";
import noUiSlider from "nouislider";
//import "nouislider/dist/nouislider.css";
import { debounce } from "lodash";

const RangeSlider = ({ min, max, step, initialValues, onValuesChange }) => {
  const sliderRef = useRef(null);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    const slider = sliderRef.current;

    // Initialize noUiSlider
    noUiSlider.create(slider, {
      start: initialValues,
      connect: true,
      range: { min, max },
      step,
      // tooltips: [
      //   { to: (value) => Math.round(value), from: (value) => Number(value) },
      //   { to: (value) => Math.round(value), from: (value) => Number(value) },
      // ],
    });

    const noUiSliderInstance = slider.noUiSlider;

    // Debounced update handler
    const debouncedUpdate = debounce((sliderValues) => {
      const numericValues = sliderValues.map(Number);
      if (onValuesChange) {
        onValuesChange(numericValues);
      }
    }, 100); // Adjust delay as needed (e.g., 100ms)

    // Sync local state and call the debounced callback on slider update
    noUiSliderInstance.on("update", (sliderValues) => {
      const numericValues = sliderValues.map(Number);
      setValues(numericValues);
      debouncedUpdate(sliderValues);
    });

    return () => {
      noUiSliderInstance.destroy();
    };
  }, [min, max]);

  // Update slider when inputs change
  const handleInputChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = Math.max(min, Math.min(max, Number(value))); // Clamp the value
    setValues(newValues);
    sliderRef.current.noUiSlider.set(newValues);
    if (onValuesChange) {
      onValuesChange(newValues);
    }
  };

  return (
    <div>
      <div ref={sliderRef}></div>
      <div className="m-3 mb-10">
        <label>
          Min:
          <input
            type="number"
            value={values[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-20 p-1 rounded-sm mx-2"
          />
        </label>
        <label>
          Max:
          <input
            type="number"
            value={values[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="w-20 p-1 rounded-sm mx-2"
          />
        </label>
      </div>
    </div>
  );
};

export default RangeSlider;
