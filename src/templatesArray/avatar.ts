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
            default: "/Avatar/Female/avatarFemale__default.webp",
            drinking: "/Avatar/Female/avatarFemale__drink.webp",
            happy: "/Avatar/Female/avatarFemale__like.webp",
            dehydrated: "/Avatar/Female/avatarFemale__tired.webp",
        },
    },
    male: {
        icon: "/User/male-avatar.png",
        main: {
            default: "/Avatar/Male/avatarMale__default.webp",
            drinking: "/Avatar/Male/avatarMale__drink.webp",
            happy: "/Avatar/Male/avatarMale__like.webp",
            dehydrated: "/Avatar/Male/avatarMale__tired.webp",
        },
    },
    '': {
        icon: "/User/anonymous.png",
    },
};
