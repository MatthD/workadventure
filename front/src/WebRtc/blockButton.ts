//the logic of the blackList button displayed in webtrc video card.
//todo: make this into an actual dom element

import {blackListManager} from "./BlackListManager";
import {HtmlUtils} from "./HtmlUtils";

const blockIcon = 'resources/logos/blockingIcon.png';
const cancelBlockIcon = 'resources/logos/cancel.png';

export const getBlockButtonHtml = (userId: string): string => {
    const src = blackListManager.isBlackListed(parseInt(userId)) ? cancelBlockIcon : blockIcon;
    return '<img id="block-'+userId+'" title="block this user" class="block-button active" src="'+src+'">'
}

export const createOnBlockCallback = (userId: string): void => {
    const blockBtn: HTMLImageElement = HtmlUtils.getElementByIdOrFail<HTMLDivElement>(`block-${userId}`) as HTMLImageElement;
    blockBtn.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const toBeBlackListed = !blackListManager.isBlackListed(parseInt(userId));
        toBeBlackListed ? blackListManager.blackList('', parseInt(userId)) : blackListManager.cancelBlackList(parseInt(userId));
        blockBtn.src = toBeBlackListed ? cancelBlockIcon : blockIcon;
    });
}