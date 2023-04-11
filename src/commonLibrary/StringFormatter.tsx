

export const StringReplace = (obj: any | null | undefined, targetString: string, replaceString: string) => {
    const str = JSON.stringify(obj)

    return str.replace(targetString, replaceString)

}