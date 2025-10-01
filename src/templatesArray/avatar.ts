import type { Gender } from "../types/Gender";

interface AvatarSet {
    icon: string;
    main?: {
        default: string;
        drinking: string;
        happy: string;
        dehydrated: string;
    };
}

export const avatarsByGender: Record<Gender, AvatarSet> = {
    female: {
        icon: "/User/female-avatar.png",
        main: {
            default: "/Avatar/Female/avatarFemale__default.png",
            drinking: "/Avatar/Female/avatarFemale__drink.png",
            happy: "/Avatar/Female/avatarFemale__like.png",
            dehydrated: "/Avatar/Female/avatarFemale__tired.png",
        },
    },
    male: {
        icon: "/User/male-avatar.png",
        main: {
            default: "/Avatar/Male/avatarMale__default.png",
            drinking: "/Avatar/Male/avatarMale__drink.png",
            happy: "/Avatar/Male/avatarMale__like.png",
            dehydrated: "/Avatar/Male/avatarMale__tired.png",
        },
    },
    '': {
        icon: "/User/anonymous.png",
    },
};
