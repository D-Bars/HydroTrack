import { useMemo, useState, type FormEvent } from "react";
import useUserStore from "../../../store/userStore";
import type { Gender } from "../../../types/Gender";
import cl from "./UserRegistrationForm.module.scss";
import InputField from "../../UI/Form/InputField/InputField";
import GenderSelector from "./GenderSelector";
import { useWaterStore } from "../../../store/waterStore";
import { calculateDailyWaterNorm } from "../../../utils/water/recommended";

interface FormState {
    nickname: string;
    gender: Gender | "";
    age: string;
    weight: string;
}

const defaultFormState: FormState = {
    nickname: "",
    gender: "",
    age: "",
    weight: "",
};

const parseOptionalNumber = (value: string): number | undefined => {
    if (!value) {
        return undefined;
    }

    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : undefined;
};

const UserRegistrationForm = () => {
    const setUser = useUserStore((state) => state.setUser);
    const setDailyGoal = useWaterStore((state) => state.setDailyGoal);
    const [formState, setFormState] = useState<FormState>(defaultFormState);
    const [submitted, setSubmitted] = useState(false);

    const errors = useMemo(() => {
        if (!submitted) {
            return {
                nickname: undefined as string | undefined,
                gender: undefined as string | undefined,
            };
        }

        return {
            nickname: formState.nickname.trim() ? undefined : "Nickname is required",
            gender: formState.gender ? undefined : "Select your gender",
        };
    }, [formState, submitted]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);

        if (!formState.nickname.trim() || !formState.gender) {
            return;
        }

        const nickname = formState.nickname.trim();
        const age = parseOptionalNumber(formState.age);
        const weight = parseOptionalNumber(formState.weight);
        const recommendedWater = calculateDailyWaterNorm(weight);

        setUser({
            nickname,
            gender: formState.gender,
            age,
            weight,
            recommendedWaterMl: recommendedWater,
        });


        if (recommendedWater) {
            setDailyGoal(recommendedWater);
        }
    };

    return (
        <form className={cl.form} onSubmit={handleSubmit}>
            <div className={cl.form__fields}>
                <InputField
                    name="nickname"
                    label="Nickname*"
                    placeholder="Enter your nickname"
                    value={formState.nickname}
                    onChange={(event) =>
                        setFormState((prev) => ({ ...prev, nickname: event.target.value }))
                    }
                    error={errors.nickname}
                    autoComplete="off"
                />

                <GenderSelector
                    value={formState.gender}
                    onChange={(gender) =>
                        setFormState((prev) => ({ ...prev, gender }))
                    }
                    error={errors.gender}
                />

                <InputField
                    name="age"
                    label="Age"
                    placeholder="Enter your age"
                    value={formState.age}
                    onChange={(event) =>
                        setFormState((prev) => ({ ...prev, age: event.target.value.replace(/[^0-9]/g, "") }))
                    }
                    optional
                    inputMode="numeric"
                />

                <InputField
                    name="weight"
                    label="Weight"
                    placeholder="Enter your weight (kg)"
                    value={formState.weight}
                    onChange={(event) =>
                        setFormState((prev) => ({
                            ...prev,
                            weight: event.target.value.replace(/[^0-9]/g, ""),
                        }))
                    }
                    optional
                    inputMode="numeric"
                />
            </div>

            <button type="submit" className={cl.form__submit}>
                Continue
            </button>
        </form>
    );
};

export default UserRegistrationForm;