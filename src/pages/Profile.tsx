import { useEffect, useMemo, useState, type FormEvent } from "react";
import useUserStore from "../store/userStore";
import { useWaterStore } from "../store/waterStore";
import InputField from "../components/UI/Form/InputField/InputField";
import cl from "./styles/Profile.module.scss";



const Profile = () => {
    const parseOptionalNumber = (value: string): number | undefined => {
        if (!value.trim()) {
            return undefined;
        }

        const parsed = Number(value);

        return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
    };

    const nickname = useUserStore((state) => state.nickname);
    const age = useUserStore((state) => state.age);
    const weight = useUserStore((state) => state.weight);
    const gender = useUserStore((state) => state.gender);
    const recommendedWaterMl = useUserStore((state) => state.recommendedWaterMl);
    const updateUser = useUserStore((state) => state.updateUser);
    const coins = useUserStore((state) => state.coins);

    const dailyGoalMl = useWaterStore((state) => state.dailyGoalMl);
    const setDailyGoal = useWaterStore((state) => state.setDailyGoal);

    const [isEditing, setIsEditing] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formState, setFormState] = useState({
        nickname: nickname ?? "",
        age: age ? String(age) : "",
        weight: weight ? String(weight) : "",
        recommendedWater: (recommendedWaterMl ?? dailyGoalMl)?.toString() ?? "",
    });

    useEffect(() => {
        if (!isEditing) {
            setFormState({
                nickname: nickname ?? "",
                age: age ? String(age) : "",
                weight: weight ? String(weight) : "",
                recommendedWater: (recommendedWaterMl ?? dailyGoalMl)?.toString() ?? "",
            });
        }
    }, [nickname, age, weight, recommendedWaterMl, dailyGoalMl, isEditing]);

    const errors = useMemo(() => {
        if (!submitted) {
            return { nickname: undefined as string | undefined, recommendedWater: undefined as string | undefined };
        }

        const nicknameError = formState.nickname.trim() ? undefined : "Nickname is required";
        let recommendedWaterError: string | undefined;

        if (formState.recommendedWater.trim()) {
            const parsed = Number(formState.recommendedWater);
            if (!Number.isFinite(parsed) || parsed <= 0) {
                recommendedWaterError = "Enter a valid amount";
            }
        }

        return { nickname: nicknameError, recommendedWater: recommendedWaterError };
    }, [formState.nickname, formState.recommendedWater, submitted]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);

        if (errors.nickname || errors.recommendedWater) {
            return;
        }

        const trimmedNickname = formState.nickname.trim();
        const parsedAge = parseOptionalNumber(formState.age);
        const parsedWeight = parseOptionalNumber(formState.weight);
        const parsedRecommended = parseOptionalNumber(formState.recommendedWater);

        updateUser({
            nickname: trimmedNickname,
            age: parsedAge,
            weight: parsedWeight,
            recommendedWaterMl: parsedRecommended,
        });

        if (parsedRecommended) {
            setDailyGoal(parsedRecommended);
        }

        setIsEditing(false);
        setSubmitted(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setSubmitted(false);
        setFormState({
            nickname: nickname ?? "",
            age: age ? String(age) : "",
            weight: weight ? String(weight) : "",
            recommendedWater: (recommendedWaterMl ?? dailyGoalMl)?.toString() ?? "",
        });
    };

    return (
        <section className={cl.profile}>
            <div className={cl.profile__card}>
                <a href="/" className={cl.profile__back__home}>Back to home</a>
                <div className={cl.profile__head}>
                    <h2 className={cl.profile__title}>Profile</h2>
                    <p className={cl.profile__subtitle}>Your personal hydration details</p>
                </div>

                {isEditing ? (
                    <form className={cl.profile__form} onSubmit={handleSubmit}>
                        <InputField
                            name="nickname"
                            label="Nickname*"
                            placeholder="Enter your nickname"
                            value={formState.nickname}
                            onChange={(event) =>
                                setFormState((prev) => ({ ...prev, nickname: event.target.value }))
                            }
                            autoComplete="off"
                            error={errors.nickname}
                        />
                        <InputField
                            name="age"
                            label="Age"
                            placeholder="Enter your age"
                            value={formState.age}
                            onChange={(event) =>
                                setFormState((prev) => ({
                                    ...prev,
                                    age: event.target.value.replace(/[^0-9]/g, ""),
                                }))
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
                        <InputField
                            name="recommendedWater"
                            label="Daily water goal"
                            placeholder="Enter the recommended intake (ml)"
                            value={formState.recommendedWater}
                            onChange={(event) =>
                                setFormState((prev) => ({
                                    ...prev,
                                    recommendedWater: event.target.value.replace(/[^0-9]/g, ""),
                                }))
                            }
                            optional
                            inputMode="numeric"
                            error={errors.recommendedWater}
                        />

                        <div className={cl.profile__formButtons}>
                            <button type="button" onClick={handleCancel} className={cl.profile__cancel}>
                                Cancel
                            </button>
                            <button type="submit" className={cl.profile__save}>
                                Save changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className={cl.profile__details}>
                        <div className={cl.profile__infoRow}>
                            <h3>Nickname</h3>
                            <div>{nickname || "-"}</div>
                        </div>
                        <div className={cl.profile__infoRow}>
                            <h3>Age</h3>
                            <div>{age ?? "-"}</div>
                        </div>
                        <div className={cl.profile__infoRow}>
                            <h3>Weight</h3>
                            <div>{weight ?? "-"}</div>
                        </div>
                        <div className={cl.profile__infoRow}>
                            <h3>Gender</h3>
                            <div>{gender || "-"}</div>
                        </div>
                        <div className={cl.profile__infoRow}>
                            <h3>Recommended water intake</h3>
                            <div>{(recommendedWaterMl ?? dailyGoalMl) ? `${recommendedWaterMl ?? dailyGoalMl} ml` : "-"}</div>
                        </div>
                        <div className={cl.profile__infoRow}>
                            <h3>Coins balance</h3>
                            <div>{coins}</div>
                        </div>
                        <button type="button" className={cl.profile__editButton} onClick={() => setIsEditing(true)}>
                            Edit profile
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Profile;