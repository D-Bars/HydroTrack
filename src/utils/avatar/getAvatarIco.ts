import type { Gender } from "../../types/Gender";
import { avatarsByGender } from "../../templatesArray/avatar";

export const getAvatarIcon = (gender: Gender) => avatarsByGender[gender].icon;