import { useState } from 'react';

type Option = "low" | "high" | "dist";

const RadioComponent = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOrderChange = (option: Option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="low"
          checked={selectedOption === "low"}
          onChange={() => handleOrderChange("low")}
        />
        최저가순
      </label>

      <label>
        <input
          type="radio"
          value="high"
          checked={selectedOption === "high"}
          onChange={() => handleOrderChange("high")}
        />
        최고가순
      </label>

      <label>
        <input
          type="radio"
          value="dist"
          checked={selectedOption === "dist"}
          onChange={() => handleOrderChange("dist")}
        />
        거리순
      </label>
    </div>
  );
};

export default RadioComponent;
