import { useState } from "react";
import { useLifecycle } from "../context/LifecycleContext";

export const useActuators = () => {
  const { currentLifecycle } = useLifecycle();
  const [actuatorStates, setActuatorStates] = useState({
    egg: { fan: false, waterPump: false, light: false, heater: false },
    larva: { fan: false, waterPump: false, light: false, heater: false },
    pupa: { fan: false, waterPump: false, light: false, heater: false },
    adult: { fan: false, waterPump: false, light: false, heater: false },
  });

  const toggleActuator = (name) => {
    setActuatorStates((prev) => ({
      ...prev,
      [currentLifecycle]: {
        ...prev[currentLifecycle],
        [name]: !prev[currentLifecycle][name],
      },
    }));
  };

  const currentActuators = actuatorStates[currentLifecycle];

  return {
    currentActuators,
    toggleActuator,
  };
};
