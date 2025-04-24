# Shopping List

Simple shopping list with React, Typescript and TailwindCSS

## Functionality

-   Save items with name and amount
-   Show items in a list
-   Mark items as checked
-   Delete items
-   Sync with localStorage for persistency

## React Concepts

-   useRef (`Form`)
-   useState (`Form`, `items-provider`)
-   useEffect (`items-provider`)
-   useCallback (`items-provider`, `Form`, `Item`)
-   useMemo (`List`)
-   Provider (`items-provider`)
-   useContext (`Form`, `List`, `Item`)

### Why Context/Provider?

To use states in multiple components without prop drilling.

The shopping list is managed inside a context. It also includes operations like addItem, checkItem and removeItem.

This enables us to have separate components (`Form`, `List`, `Item`) with different purposes, all manipulating the same state.
