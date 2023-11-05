import { atom } from "jotai"

export const articlesAtom = atom([])

export const updateArticleAtom = atom(
    null,
    (get, set, newData) => {
        const prevDatas = get(articlesAtom);

        set(
            articlesAtom,
            [...prevDatas, newData]
        )
    }
)