import Sound from "@/Service/Sound";
import {getRandom} from "@/Service/Helper";

export default class Item {
    id;
    soundType;
    soundValue;

    constructor() {
        this.id = '_' + Math.random().toString(36).substr(2, 9);
        this.soundType = Sound.types[getRandom(0, Sound.types.length - 1)];
        this.soundValue = getRandom(100, 1000);
    }
}
