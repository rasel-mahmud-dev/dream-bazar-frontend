import React, {FC, HTMLAttributes, SyntheticEvent} from "react";

function chooseFirstLetter(name) {
    if (!name) {
        return "";
    }
    let letterOne = name[0];
    let letterTwo = "";
    let splitName = name.split(" ");
    if (splitName.length > 1) {
        letterTwo = splitName[1][0];
    }
    return letterOne + letterTwo;
}

interface Props extends HTMLAttributes<HTMLDivElement>{
    className?: string,
    username?: string
    imgClass?: string
    src: string
}

const Image: FC<Props> = ({className = "", imgClass = "", username, src, ...attr}) => {
    let letter = chooseFirstLetter(username)

    function handleErrorImage(e: React.SyntheticEvent<HTMLImageElement, Event>) {
        // @ts-ignore
        let avatarRoot = (e.target?.parentNode )as HTMLElement
        avatarRoot.innerHTML = `
			<span class="rounded-full bg-dark-5/50 w-9 h-9 flex items-center text-sm font-medium justify-center uppercase">${chooseFirstLetter(username)}</span>
		`
    }

    return (
        <div className={className} {...attr}>
            {src
                ? <div className="avatar-root">
                    <img onError={handleErrorImage} src={src} alt="avatar"
                         className={`rounded-full w-full ${imgClass}`}/>
                </div>
                : <div
                    className={`rounded-full bg-dark-100 flex text-base items-center justify-center uppercase ${imgClass}`}>{letter}</div>
            }
        </div>
    );
};

export default Image;
