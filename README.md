# boro-belt 

Market Boro's vscode snippet for ts-belt and ts-pattern.

## Features

### Pipe Operator
- Description: pipe operator
- Prefix: pp
- Body:
```
pipe(${1:initialValue}, ${2:following function})
```


### Flow Operator
- Description: flow operator
- Prefix: fl
- Body:
```
flow(${1:initialFunction}, ${2:following function})
```


### Array all
- Description: Array.all
- Prefix: aal
- Body:
```
A.all(${1:function}),
```


### Array keepMap
- Description: Array.keepMap
- Prefix: akm
- Body:
```
A.keepMap(${1:function}),
```


### Array map
- Description: Array.map
- Prefix: am
- Body:
```
A.map(${1:function}),
```


### Array sort
- Description: Array.sort
- Prefix: aso
- Body:
```
A.sort(${1:function}),
```


### Array head
- Description: Array.head
- Prefix: ah
- Body:
```
A.head(${1:array}),
```


### Array tail
- Description: Array.tail
- Prefix: at
- Body:
```
A.tail(${1:array}),
```


### Array partition
- Description: Array.partition
- Prefix: apt
- Body:
```
A.partition(${1:predicateFn}),
```


### Option Some
- Description: Option.Some
- Prefix: os
- Body:
```
O.some(${1:value}),
```


### Option None
- Description: Option.None
- Prefix: on
- Body:
```
O.None,
```


### Option isSome
- Description: Option.isSome
- Prefix: ois
- Body:
```
O.isSome(${1:value}),
```


### Option isNone
- Description: Option.isNone
- Prefix: oin
- Body:
```
O.isNone(${1:value}),
```


### Option map
- Description: Option.map
- Prefix: om
- Body:
```
O.map(${1:function}),
```


### Option flatMap
- Description: Option.flatMap
- Prefix: ofm
- Body:
```
O.flatMap(${1:function}),
```


### Option getWithDefault
- Description: Option.getWithDefault
- Prefix: owd
- Body:
```
O.getWithDefault(${1:defaultValue}),
```


### Option fromNullable
- Description: Option.fromNullable
- Prefix: ofn
- Body:
```
O.fromNullable(${:value}),
```


### Option fromExecution
- Description: Option.fromExecution
- Prefix: ofe
- Body:
```
O.fromExecution(${1:function}),
```


### Option fromPredicate
- Description: Option.fromPredicate
- Prefix: ofp
- Body:
```
O.fromPredicate(${1:predicateFn}),
```


### Option fromPromise
- Description: Option.fromPromise
- Prefix: ofpr
- Body:
```
O.fromPromise(${1:promise}),
```


### Option contains
- Description: Option.contains
- Prefix: oc
- Body:
```
O.contains(${1:value}),
```


### Function always
- Description: Function always
- Prefix: fal
- Body:
```
F.always(${1:value})
```


### Function identity
- Description: Function identity
- Prefix: fid
- Body:
```
F.identity
```


### Function coerce
- Description: Function coerce
- Prefix: fc
- Body:
```
F.coerce(${1:value})
```


### Function tap
- Description: Function.tap
- Prefix: ft
- Body:
```
F.tap(${1:function})
```


### Function debounce
- Description: Fuction.debounce
- Prefix: fdb
- Body:
```
F.debounce(${1:time})
```


### Function throttle
- Description: Function.trottle
- Prefix: fth
- Body:
```
F.throttle(${1:time})
```


### String toUpper
- Description: String toUpper
- Prefix: su
- Body:
```
S.toUpper
```


### String toLower
- Description: String toLower
- Prefix: sl
- Body:
```
S.toLower
```


### String trim
- Description: String trim
- Prefix: st
- Body:
```
S.trim
```


### String remove
- Description: String remove
- Prefix: sr
- Body:
```
S.remove(${1:substring})
```


### String removeAll
- Description: String removeAll
- Prefix: sra
- Body:
```
S.removeAll(${1:substring})
```


### Dict mapWithKey
- Description: Dict mapWithKey
- Prefix: dmk
- Body:
```
D.mapWithKey(${1:function})
```


### Pattern match
- Description: Pattern match
- Prefix: ptm
- Body:
```
match(${1:value})
.${2:case}(${3:predicateFn}, ${4:handler})
.otherwise(${5:handler})
```


### Pattern matching with With
- Description: Pattern matching with With
- Prefix: ptmwt
- Body:
```
match(${1:value})
.with(${2:pattern},${3:handler})
.otherwise(${4:handler})
```


### Pattern matching with When
- Description: Pattern matching with When
- Prefix: ptmwh
- Body:
```
match(${1:value})
.when(${2:handler},${3:handler})
.otherwise(${4:handler})
```

