import type { NewsItem, LayoutGroupType, LayoutGroupItem } from "@/types"
export const useLayoutGroupsGenerator = (list: NewsItem[]) => {
  type CreateListFun = (
    type: LayoutGroupType,
    subList: NewsItem[]
  ) => LayoutGroupItem
  const createList: CreateListFun = (type, subList) => {
    return { type, subList }
  }

  let lastIndex = 0
  const newList: LayoutGroupItem[] = []
  type LayoutSegment = {
    type: LayoutGroupType
    maxItemsCount: number
  }
  const layoutSegments: LayoutSegment[] = [
    { type: "single", maxItemsCount: 1 },
    { type: "grid1", maxItemsCount: 4 },
    { type: "grid2", maxItemsCount: 3 },
    { type: "grid3", maxItemsCount: 6 },
    { type: "grid4", maxItemsCount: 6 },
    { type: "grid5", maxItemsCount: NaN },
  ]

  if (!list || list.length <= 0) {
    return []
  }

  for (let i = 0; i < layoutSegments.length; i++) {
    const segmentItem = layoutSegments[i]
    const { maxItemsCount, type } = segmentItem ?? {
      type: "single",
      maxItemsCount: NaN,
    }
    const maxCount = lastIndex + maxItemsCount
    if (list.length >= maxCount || isNaN(maxItemsCount)) {
      const subList = list.slice(lastIndex, maxCount || undefined)
      if(subList?.length <= 0) break;
      newList.push(createList(type, subList))
      lastIndex = maxCount
    }
  }

  return newList
}
