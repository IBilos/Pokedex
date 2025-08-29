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
  const [localValues, setLocalValues] = useState(values);
  const [isDragging, setIsDragging] = useState(false);
  const [minValue, maxValue] = localValues;

  // Keep values constrained
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.min(Number(e.target.value), maxValue - step);
    setLocalValues([Math.max(min, v), maxValue]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(Number(e.target.value), minValue + step);
    setLocalValues([minValue, Math.min(max, v)]);
  };

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  useEffect(() => {
    if (!isDragging) {
      onChange(localValues);
    }
  }, [isDragging, localValues, onChange]);

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

        {/* min thumb */}
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

        {/* max thumb */}
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
