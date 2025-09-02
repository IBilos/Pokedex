import './StatSlider.scss';
import type { StatSliderProps } from '../../../types/props';
import { useEffect, useState } from 'react';

export default function StatSlider({
  label,
  min,
  max,
  values,
  step = 1,
  onChange,
}: StatSliderProps) {
  const [dragValues, setDragValues] = useState(values);
  const [isDragging, setIsDragging] = useState(false);

  // Sync dragValues when parent values change (like reset)
  useEffect(() => {
    if (!isDragging) {
      setDragValues(values);
    }
  }, [values, isDragging]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.min(Number(e.target.value), dragValues[1] - step);
    setDragValues([Math.max(min, v), dragValues[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(Number(e.target.value), dragValues[0] + step);
    setDragValues([dragValues[0], Math.min(max, v)]);
  };

  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = () => {
    setIsDragging(false);
    onChange(dragValues);
  };

  const [minValue, maxValue] = dragValues;

  const total = max - min;
  const clampedMin = Math.max(min, Math.min(minValue, max));
  const clampedMax = Math.max(min, Math.min(maxValue, max));
  const leftPercent = ((clampedMin - min) / total) * 100;
  const rangePercent = ((clampedMax - clampedMin) / total) * 100;

  return (
    <div className="stat-slider">
      {label && <label className="stat-slider__label">{label}</label>}

      <div className="stat-slider__container">
        <div className="stat-slider__track" />
        <div
          className="stat-slider__highlight"
          style={{ left: `${leftPercent}%`, width: `${rangePercent}%` }}
        />

        <input
          className="stat-slider__range stat-slider__range--min"
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          aria-label={`${label ?? 'Range'} minimum`}
        />

        <input
          className="stat-slider__range stat-slider__range--max"
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          aria-label={`${label ?? 'Range'} maximum`}
        />
      </div>

      <div className="stat-slider__values">
        <span>{minValue}</span> – <span>{maxValue}</span>
      </div>
    </div>
  );
}
