import type { Gender } from "../../types/Gender";
import { avatarsByGender } from "../../templatesArray/avatar";

export const getMainAvatarArray = (gender: Gender) => avatarsByGender[gender].main;