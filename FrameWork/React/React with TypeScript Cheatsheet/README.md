# React with TypeScript CheatSheet

## Table of Contents

- [Table of Contents](#table-of-contents)
- [How to type React props](#how-to-type-react-props)
- [Creating a type alias for the props](#creating-a-type-alias-for-the-props)
- [Typing optional props](#typing-optional-props)
- [List of types for React component props](#list-of-types-for-react-component-props)
- [How to type React function components](#how-to-type-react-function-components)
- [How to type React hooks](#how-to-type-react-hooks)
- [Typing useState hook](#typing-usestate-hook)
- [Typing useEffect and useLayoutEffect hooks](#typing-useeffect-and-uselayouteffect-hooks)
- [Typing useContext hook](#typing-usecontext-hook)
- [Typing useRef hook](#typing-useref-hook)
- [Typing useMemo hook](#typing-usememo-hook)
- [Typing useCallback hook](#typing-usecallback-hook)
- [Typing custom hooks](#typing-custom-hooks)
- [How to type HTML events and forms](#how-to-type-html-events-and-forms)
- [Understanding different typings for React components](#understanding-different-typings-for-react-components)
- [When to use each type?](#when-to-use-each-type)
- [How to type (extend) HTML elements](#how-to-type-extend-html-elements)
- [ComponentPropsWithoutRef vs \[Element\]HTMLAttributes](#componentpropswithoutref-vs-elementhtmlattributes)
- [When to use type vs interface?](#when-to-use-type-vs-interface)
- [Conclusion](#conclusion)

## How to type React props

Since React props are used to send transmit data between one React component to another, there are many types that you can use to type React props.

To write the types of your props, you need to add a colon and the object literal notation (: {}) next to the destructuring assignment of the children prop at the component declaration

Here’s an example of typing a string and a number props:

由于 React props 是用来在一个 React 组件与另一个组件之间发送传输数据的，所以有很多类型可以用来给 React props 定义。

要写出你的 props 的类型，你需要在组件声明中的 props 属性的解构赋值旁边加上冒号和对象字面符号（：{}）。

下面是一个输入字符串和数字 props 的例子。

```tsx
const App = ({ title, score }: { title: string; score: number }) => (
  <h1>
    {title} = {score}
  </h1>
);
```

### Creating a type alias for the props

Since the convention in React is to write one component in one .js or .jsx file, you can declare a type alias for the component props to make the code easier to read.

Here’s an example of creating a type alias for the App component props:

由于 React 的公约是在一个.js 或.jsx 文件中写一个组件，你可以为组件的 props 声明一个类型别名，使代码更容易阅读。

下面是一个为 App 组件 props 创建类型别名的例子。

```tsx
type Props = {
  title: string;
  score: number;
};
const App = ({ title, score }: Props) => (
  <h1>
    {title} = {score}
  </h1>
);
```

As you can see, the type object for component props will save you from having to include the prop types inline.

正如你所看到的，组件属性的类型对象将使你不必在内联中包含属性类型。

### Typing optional props

You can make a prop optional by adding the question mark ? symbol after the prop name.

The following example makes the title prop optional:

你可以通过在属性名称后面添加问号"?"符号来使属性成为可选项。

下面的例子中，title 是可选的。

```tsx
type Props = {
  title?: string;
  score: number;
};
```

The optional prop means that you can render the component without passing the prop, but when you do pass the prop, it must be of the declared type.

可选的属性意味着你可以在不传递此属性的情况下渲染组件，但当你传递此属性时，它必须是声明的类型。

### List of types for React component props

Now that you know how to check the props type, here’s a list of common types that you may want to use in your React application.

First, you have primitive types like string , number , and boolean as shown below:

现在你知道了如何检查属性类型，这里有一个你可能想在 React 应用程序中使用的常见类型的列表。

首先，你有原始类型，如 string、number 和 boolean，如下所示。

```tsx
type Props = {
  // primitive types
  title: string;
  score: number;
  isWinning: boolean;
};
```

You can also create an array of one type by adding the array literal notation ([]) after the type as follows:

你也可以通过在类型后面添加数组字面符号（[]）来创建一个类型的数组，如下所示。

```tsx
type Props = {
  title: string[]; // an array of string
  score: number;
  isWinning: boolean;
};
```

You can also write literal values to specify the exact values that can be accepted by the prop.

You need to separate the literals using a single pipe operator | as shown below:

你也可以写出字面意义的值来指定属性可以接受的确切数值。

你需要使用单管运算符|来分隔字面意义，如下所示。

```tsx
type Props = {
  priority: "high" | "normal" | "low";
  score: 5 | 9 | 10;
};
```

TypeScript will throw a static error when the value of priority or score prop above doesn’t match any of the literal values.

Next, you can type an object prop as follows:

当上面的 "priority"或 "score"属性的值与任何字面值不匹配时，TypeScript 会抛出一个静态错误。

接下来，你可以输入一个对象道具，如下所示。

```tsx
type Props = {
  user: {
    username: string;
    age: number;
    isMember: boolean;
  };
};
```

When you have an array of objects prop, just add the array literal notation at the end of the object declaration as follows:

当你有一个对象的数组属性时，只需在对象声明的最后加上数组字面符号，如下所示。

```tsx
type Props = {
  user: {
    username: string;
    age: number;
    isMember: boolean;
  }[]; // right here
};
```

React props can also receive functions such as onClick and onChange , so you may need to type function props.

You can type the parameters accepted by the function or take an event object from the HTML as shown below:

React 道具也可以接收函数，如`onClick`和`onChange`，所以你可能需要输入函数道具。

你可以键入函数接受的参数，或者从 HTML 中抽取一个事件对象，如下所示。

```tsx
type Props = {
  // function that returns nothing
  onClick: () => void;
  // function accepts a parameter and has return type
  onChange: (target: string) => boolean;
  // function that takes an event
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
```

If you’re declaring an onChange function in the component’s body, then you can immediately check the parameter and the return types of the function as shown below:

如果你在组件的主体中声明了一个 onChange 函数，那么你可以立即检查该函数的参数和返回类型，如下图所示。

```tsx
const App = () => {
  const [message, setMessage] = useState("");

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setMessage(e.currentTarget.value);
  };

  // code omitted for clarity..
};
```

Finally, React components can accept another component as the children prop, so you need to use ReactNode to type these children props:

最后，React 组件可以接受另一个组件作为 children 属性，所以你需要使用 ReactNode 来输入这些 children 属性。

```tsx
type Props = {
  children: React.ReactNode;
};
const App = ({ children }: Props) => <div>{children}</div>;
```

## How to type React function components

TypeScript’s Definitely Typed library include the React.FunctionComponent (or React.FC for short) that you can use to type React function components.

You can combine the type Props and the React.FC type to create a type-safe function component with props as follows:

TypeScript 的 Definitely Typed 库包括 React.FunctionComponent（简称 React.FC），你可以用来对 React 函数组件进行类型。

你可以将 Props 类型和 React.FC 类型结合起来，用 props 创建一个类型安全的函数组件，如下所示。

```tsx
type Props = {
  title: string;
};
const App: React.FC<Props> = ({ title }) => {
  return <h1>{title}</h1>;
};
```

When you call on the App component above, you will be required to specify the message prop with string type.

But since TypeScript is able to infer the type of your variable, you can remove typing the component with React.FC like this:

当你调用上面的 App 组件时，你将收到提示用字符串类型指定属性的信息。

但由于 TypeScript 能够推断出你的变量的类型，你可以像这样删除 React.FC 输入组件。

```tsx
type Props = {
  title: string;
};
const App = ({ title }: Props) => <div>{title}</div>;
// App type will be inferred
```

If you have only a few props for the component, you can even type the props inline, removing the need to create the type Props as shown below:

如果你的组件只有几个参数，你甚至可以在函数组件内联参数中输入类型，而不需要定义组件 Props 类型，如下。

```tsx
const App = ({ title }: { title: string }) => <div>{title}</div>;
```

Because of TypeScript’s inferred type feature, there’s no need for you to type React function components at all.

由于 TypeScript 的推断类型功能，你根本不需要输入 React 函数组件的类型。

## How to type React hooks

React hooks are supported by @types/react library from version 16.8.

Generally, Typescript should be able to infer the type for your hooks unless you have specific cases where the type must be declared explicitly.

Let’s take a look at how to type React hooks one by one, starting from the useState hook

从 16.8 版本开始，@types/react 库支持 React hooks。

一般来说，Typescript 应该能够推断出 hooks 的类型，除非你有必须明确声明类型的特殊情况。

让我们来看看如何对 React hooks 逐一进行类型化，从 useState 开始。

### Typing useState hook

The useState value can be inferred from the initial value you set when you call the function.

For example, the following useState() call initialize the state with an empty string. When you call the setState function, you need to put a string or there will be an error:

useState 的值可以从你调用函数时设置的初始值推断出来。

例如，下面的 useState()调用用一个空字符串来初始化状态。当你调用 setState 函数时，你需要放一个字符串，否则会出现错误。

```tsx
const App = () => {
  const [title, setTitle] = useState(""); // type is string
  const changeTitle = () => {
    setTitle(9); // error: number not assignable to string!
  };
};
```

But when you need to initialize your state with values like null or undefined , then you need to add a generic when you initialize the state.

A generic allows you to use several types for the useState hook as shown below:

但是当你需要用 null 或 undefined 这样的值来初始化你的状态时，你就需要在初始化状态时添加一个通用类型。

一个通用类型允许你为 useState hook 使用几种类型，如下所示。

```tsx
// title is string or null
const [title, setTitle] = useState<string | null>(null);
// score is number or undefined
const [score, setScore] = useState<number | undefined>(undefined);
```

When you have a complex object as the state value, you can create an interface or a type for that object as follows:

当你有一个复杂的对象作为状态值时，你可以为该对象创建一个 interface 或一个 Type，如下所示。

```tsx
interface Member {
  username: string;
  age?: number;
}
const [member, setMember] = useState<Member | null>(null);
```

### Typing useEffect and useLayoutEffect hooks

You don’t need to type the useEffect and useLayoutEffect hooks because they don’t deal with returning values. The cleanup function for the useEffect hook is not considered a value that can be changed either.

You can write these hooks as normal.

你不需要输入 useEffect 和 useLayoutEffect 钩子，因为它们不处理返回值。useEffect 钩子的清理函数也不被认为是一个可以被改变的值。

你可以像平常一样写这些钩子。

### Typing useContext hook

The useContext hook type is usually inferred from the initial value you passed into the createContext() function as follows:

useContext 钩子的类型通常是从你传入 createContext()函数的初始值推断出来的，如下所示。

```tsx
const AppContext = createContext({
  authenticated: true,
  lang: "en",
  theme: "dark",
});
const MyComponent = () => {
  const appContext = useContext(AppContext); //inferred as an object
  return <h1>The current app language is {appContext.lang}</h1>;
};
```

The context value above will be inferred as the following object:

上面的上下文值将被推断为以下对象。

```ts
{
  authenticated: boolean,
  lang: string,
  theme: string
}
```

Alternatively, you can also create a type that will serve as the generic for the CreateContext return value.

For example, suppose you have a ThemeContext that only has two values: light and dark.

Here’s how you type the context:

另外，你也可以创建一个类型，作为 CreateContext 返回值的通用类型。

例如，假设你有一个 ThemeContext，只有两个值：light 和 dark。

下面是你如何输入上下文的。

```tsx
type Theme = "light" | "dark";
const ThemeContext = createContext<Theme>("dark");
```

The type will be used when you set the value of the context using ThemeContext.Provider later in your code.

Then, the useContext hook will infer the type from the context object ThemeContext that you passed as its argument:

该类型将在你以后的代码中使用 ThemeContext.Provider 设置上下文的值时使用。

然后，useContext 钩子将从你作为参数传递的上下文对象 ThemeContext 中推断出该类型。

```tsx
const App = () => {
  const theme = useContext(ThemeContext);
  return <div>The theme is {theme}</div>;
};
```

### Typing useRef hook

Based on React documentation, the useRef hook is commonly used to reference an HTML input element as follows:

根据 React 文档，useRef 钩子通常用于引用一个 HTML 输入元素，如下所示。

```tsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

Following this use case, you can write a generic that accepts HTMLInputElement as shown below:

按照这个用例，你可以写一个接受 HTMLInputElement 的泛型，如下所示。

```tsx
const inputRef = useRef<HTMLInputElement>(null);
```

你不需要在通用类型中添加 null，因为 HTMLInputElement 已经接受了 HTMLInputElement | null。

### Typing useMemo hook

The useMemo hook returns a memoized value, so the type will be inferred from the returned value:

useMemo 钩子返回一个记忆化(memoized) 值，所以类型将从返回值中推断出来。

```tsx
const num = 24;
// inferred as a number from the returned value below
const result = useMemo(() => Math.pow(10, num), [num]);
```

### Typing useCallback hook

The useCallback hook returns a memoized callback function, so the type will be inferred from the value returned by the callback function:

useCallback 钩子返回一个记忆化的回调函数，所以类型将从回调函数返回值中推断出来。

```tsx
const num = 9;
const callbackFn = useCallback(
  (num: number) => {
    return num * 2; // type inferred as a number
  },
  [num]
);
```

### Typing custom hooks

Since custom hooks are functions, you can add explicit types for its parameters while inferring its type from the returned value

由于自定义钩子是函数，你可以为它的参数添加明确的类型，同时从返回值推断出它的类型

```tsx
function useFriendStatus(friendID: number) {
  const [isOnline, setIsOnline] = useState(false);
  // code for changing the isOnline state omitted..
  return isOnline;
}
const status = useFriendStatus(9); // inferred type boolean
```

When you return an array similar to the useState hook, then you need to assert the returned value as const so that TypeScript doesn’t infer your type as a union:

当你返回一个类似于 useState 钩子的数组时，那么你需要将返回的值断言为 const，这样 TypeScript 就不会将你的类型推断为 union。

```tsx
function useCustomHook() {
  return ["Hello", false] as const;
}
```

Without the as const assertion, TypeScript will infer the returned values as (string | boolean)[] instead of [string, boolean]

And that’s how you can type React hooks. Let’s learn how to type HTML events and forms next.

如果没有 as const 断言，TypeScript 会将返回的值推断为(string | boolean)[]而不是[string, boolean] 。

这就是你如何输入 React hooks 的方法。接下来我们来学习如何输入 HTML 事件和表单。

## How to type HTML events and forms

Most HTML events types can be inferred correctly by TypeScript, so you don’t need to explicitly set the type.

For example, a button element onClick event will be inferred as React.MouseEvent by TypeScript:

大多数 HTML 事件的类型可以被 TypeScript 正确推断出来，所以你不需要明确设置类型。

例如，一个按钮元素的 onClick 事件将被 TypeScript 推断为 React.MouseEvent。

```tsx
const App = () => (
  <button onClick={(e) => console.log("Clicked")}>button</button>
  // ^^^ e inferred as React.MouseEvent<HTMLButtonElement, MouseEvent>
);
```

For HTML forms, you will need to type the onSubmit event as React.FormEvent because the default inference Any will throw an error.

But the onChange events for your HTML inputs usually can be inferred from the event itself.

Here’s an example of a React form in TypeScript:

对于 HTML 表单，你需要把 onSubmit 事件打成 React.FormEvent，因为默认的推断 Any 将会抛出一个错误。

但是你的 HTML 输入的 onChange 事件通常可以从事件本身推断出来。

下面是一个 TypeScript 中的 React 表单的例子。

```tsx
const App = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle submission here...
    alert(`email value: ${email}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            // ^^^ onChange inferred as React.ChangeEvent
          />
        </label>
      </div>
      <div>
        <input type="Submit" value="Submit" />
      </div>
    </form>
  );
};
```

### Understanding different typings for React components

Although TypeScript could infer the return type of React function components as you code the components, you may have a project with a linting rule that requires the return type to be explicitly defined.

The @types/react library has several types that you can use to define the return type of React function components.

尽管 TypeScript 可以在你编码 React 函数组件时推断其返回类型，但你可能有一个项目，它的提示规则要求明确定义返回类型。

@types/react 库有几种类型，你可以用来定义 React 函数组件的返回类型。

- ReactElement
- JSX.Element
- ReactNode

This section is dedicated to helping you understand these types and when to use them.

A ReactElement is an interface for an object with type, props, and key properties as shown below:

本节致力于帮助你理解这些类型以及何时使用它们。

ReactElement 是一个具有类型、道具和关键属性的对象的接口，如下所示。

```ts
type Key = string | number;
interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
> {
  type: T;
  props: P;
  key: Key | null;
}
```

A JSX.Element is an extension of ReactElement that has the type \<T> and props\<P> implemented as any as you can see in the [repository](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L3091):

JSX.Element 是 ReactElement 的一个扩展，它有 type\<T>和 props\<P>的实现，正如你在资源库中看到的那样。

```ts
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
}
```

The type for ReactElement is more strict than in JSX.Element , but they are essentially the same

Finally, ReactNode is a type that’s very loose as it includes anything that can be returned by the render() method of React class components.

In the repository, ReactNode is defined like this:

ReactElement 的类型比 JSX.Element 更严格，但它们在本质上是一样的。

最后，ReactNode 是一个非常宽松的类型，因为它包括任何可以由 React 类组件的 render()方法返回的东西。

在仓库中，ReactNode 是这样定义的。

```ts
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;
```

This is why when your component has a children prop that can receive another component, it’s recommended to use ReactNode as its type because it can receive anything that can be rendered by React.

On the other hand, ReactElement and JSX.Element are more strict when compared with ReactNode as it doesn’t allow you to return values like null

这就是为什么当你的组件有一个可以接收另一个组件的子项时，建议使用 ReactNode 作为其类型，因为它可以接收任何可以被 React 渲染的东西。

另一方面，ReactElement 和 JSX.Element 与 ReactNode 相比更加严格，因为它不允许你返回 null 这样的值。

## When to use each type?

The ReactNode type is best used for typing a children prop that can receive another React component or JSX elements like this:

ReactNode 类型最好用于键入一个可以接收另一个 React 组件或 JSX 元素的儿童道具，像这样。

```tsx
// App.tsx
const App = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

// At index.tsx
<App>
  <Header />
  <h2>Another title</h2>
</App>;
```

This is because both ReactElement and JSX.Element types are more strict on the return type (doesn’t allow null) and they expect you to return a single element.

To accept both single and multiple children for these two types, you need to use ReactElement | ReactElement[] or JSX.Element | JSX.Element[] as the children type

The ReactElement and JSX.Element types are more suited for explicitly defining the return type of a React component like this:

这是因为 ReactElement 和 JSX.Element 类型对返回类型的要求比较严格（不允许 null），它们希望你能返回一个单一元素。

为了接受这两种类型的单个和多个子元素，你需要使用 ReactElement | ReactElement[] 或 JSX.Element | JSX.Element[] 作为子元素类型。

ReactElement 和 JSX.Element 类型更适合于明确定义 React 组件的返回类型，比如这样。

```tsx
const App = (): React.ReactElement | JSX.Element => {
  return <div>hello</div>;
};
```

But since we’re talking about best practices here, then I recommend you follow the definition of FunctionComponent interface in the types library, which uses ReactElement<any, any> | null :

但既然我们在这里讨论的是最佳实践，那么我建议你遵循类型库中 FunctionComponent 接口的定义，它使用 ReactElement<any, any> | null。

```ts
interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}
```

And because JSX.Element is exactly extending ReactElement<any, any> , you can define a React function component return type as follows:

而由于 JSX.Element 正是扩展了 ReactElement<any, any>，你可以定义一个 React 函数组件的返回类型，如下所示。

```tsx
const App = (): JSX.Element | null => {
  return <div>hello</div>;
};
```

This way, your component can still render nothing by returning null .

I hope this section has helped you to understand the different types that can be used for typing React components.

这样一来，你的组件仍然可以通过返回 null 来呈现什么。

我希望这一节能帮助你了解可用于 React 组件类型的不同类型。

## How to type (extend) HTML elements

Sometimes, you want to create a small, modular component that takes the attributes of a native HTML element as its props.

Some useful components that you may create for your application are button , img , or input elements.

The @types/react library ships with ComponentPropsWithoutRef type that you can use to grab all the native attributes of an HTML element as the props type of your component.

For example, the native button element knows about the onClick attribute already, but when you create a React \<Button> component, you usually need to define the prop using an interface or a type like this:

有时，您想创建一个小的、模块化的组件，将原生 HTML 元素的属性作为其道具。

您可以为应用程序创建的一些有用组件是 button 、 img 或 input 元素。

@types/react 库附带了 ComponentPropsWithoutRef 类型，您可以使用它来获取 HTML 元素的所有本机属性作为组件的 props 类型。

例如，原生按钮元素已经知道 onClick 属性，但是当你创建一个 React \<Button> 组件时，你通常需要使用一个接口或这样的类型来定义 prop：

```tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};
const Button = ({ children, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};
```

With the above example, you need to keep adding another prop to the ButtonProps as you need them as follows:

通过上面的例子，你需要在你需要的时候不断向 ButtonProps 添加另一个参数，如下所示。

```ts
type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  type: "button" | "submit" | "reset" | undefined;
};
```

The ComponentPropsWithoutRef type can be used so that you don’t need to add these native HTML attributes to the type as you grow your application.

You can simply create a type that has all the native button attributes as props like this:

可以使用 ComponentPropsWithoutRef 类型，这样你就不需要在你的应用程序成长过程中向该类型添加这些原生 HTML 属性。

你可以简单地创建一个类型，将所有的原生 button 属性作为属性，像这样。

```tsx
type ButtonProps = React.ComponentPropsWithoutRef<"button">;
const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
};
```

The ComponentPropsWithoutRef<"button"> type has all the props of a native HTML button element.

If you want to create an \<Img> component, then you can use the ComponentPropsWithoutRef<"img"> type:

ComponentPropsWithoutRef<"button"> 类型具有原生 HTML 按钮元素的所有属性。

如果你想创建一个 \<Img> 组件，那么你可以使用 ComponentPropsWithoutRef<"img"> 类型：

```tsx
type ImgProps = React.ComponentPropsWithoutRef<"img">;
const Img = ({ src, loading }: ImgProps) => {
  return <img src={src} loading={loading} />;
};
```

You only need to change the generic type of ComponentPropsWithoutRef\<T> to extend different HTML elements. For example:

你只需要改变 ComponentPropsWithoutRef\<T>的通用类型来扩展不同的 HTML 元素。比如说。

- ComponentPropsWithoutRef<'img'> to extend \<img> element
- ComponentPropsWithoutRef<'button'> to extend \<button> element
- ComponentPropsWithoutRef<'a'> to extend \<a> element

And so on. When you need to add a custom prop that doesn’t exist in the native HTML element, you can create an interface that extends the native attributes as follows:

以此类推。当你需要添加一个本地 HTML 元素中不存在的自定义道具时，你可以创建一个扩展本地属性的接口，如下所示。

```tsx
interface ImgProps extends React.ComponentPropsWithoutRef<"img"> {
  customProp: string;
}
const Img = ({ src, loading, customProp }: ImgProps) => {
  // use the customProp here..
  return <img src={src} loading={loading} />;
};
```

This is particularly useful if you need a custom prop to determine the look of your component.

In the following example, the custom prop color is used to determine the style: color CSS attribute of the \<h1> element:

如果你需要一个自定义道具来决定你的组件的外观，这就特别有用。

在下面的例子中，自定义道具颜色被用来决定\<h1>元素的 style: color CSS 属性。

```tsx
interface headerProps extends React.ComponentPropsWithoutRef<"h1"> {
  variant: "primary" | "secondary";
}
const Header = ({ children, variant }: headerProps) => {
  return (
    <h1 style={{ color: variant === "primary" ? "black" : "red" }}>
      {children}
    </h1>
  );
};
```

The ComponentPropsWithoutRef type makes it easy to create a component that’s an extension of native HTML elements without having to type all possible prop parameters yourself.

You can even add additional props by extending the interface.

The ComponentPropsWithoutRef interface also has a twin called ComponentPropsWithRef that you can use when you need to forward a reference to the component’s children.

Learn more about ref forwarding here: <https://reactjs.org/docs/forwarding-refs.html>

ComponentPropsWithoutRef 类型使得创建一个原生 HTML 元素的扩展的组件变得很容易，而不需要自己输入所有可能的道具参数。

你甚至可以通过扩展该接口来添加额外的 props。

ComponentPropsWithoutRef 接口还有一个叫 ComponentPropsWithRef 的孪生接口，当你需要转发引用到组件的子节点时，你可以使用它。

在这里了解更多关于引用转发的信息：https://reactjs.org/docs/forwarding-refs.html

### ComponentPropsWithoutRef vs \[Element\]HTMLAttributes

If you have used TypeScript with React before, you may be familiar with the \[Element\]HTMLAttributes interface from @types/react library that you can use to extend HTML elements as follows:

如果你以前使用过 TypeScript 与 React，你可能熟悉@types/react 库中的\[Element\]HTMLAttributes 接口，你可以用它来扩展 HTML 元素，如下所示。

```ts
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;
```

These \[Element\]HTMLAttributes interfaces produce the same type as ComponentPropsWithoutRef interface, but they are more verbose since you need to use a different interface and generic for each HTML element.

On the other hand, ComponentPropsWithoutRef only requires you to change the generic type \<T>. Both are fine for extending HTML elements in React components.

You can see an explanation from the library author here:

这些\[Element\]HTMLAttributes 接口产生的类型与 ComponentPropsWithoutRef 接口相同，但它们更加啰嗦，因为你需要为每个 HTML 元素使用不同的接口和泛型。

另一方面，ComponentPropsWithoutRef 只需要你改变通用类型\<T>。两者对于在 React 组件中扩展 HTML 元素都很好。

你可以在这里看到该库作者的解释。

<https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36505#issuecomment-549394273>

## When to use type vs interface?

Both type and interface from TypeScript can be used to define React props, components, and hooks.

From the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces):

TypeScript 的类型和接口都可以用来定义 React 的道具、组件和钩子。
摘自《TypeScript 手册》。

> Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.
> 类型别名和接口非常相似，在很多情况下你可以在它们之间自由选择。几乎所有接口的功能都可以在类型中使用，关键的区别在于，类型不能被重新打开以添加新的属性，而接口则总是可以扩展的。

When using interfaces, you can freely extends an interface as follows:

在使用接口时，你可以自由地扩展一个接口，如下所示。

```ts
interface HtmlAttributes {
  disabled: boolean;
}
interface ButtonHtmlAttributes extends HtmlAttributes {
  type: "Submit" | "Button" | null;
}
```

But types can’t be extended like interfaces. You need to use the intersection symbol (&) as follows:

但 type 不能像接口那样被扩展。你需要使用交叉符号（&），如下所示。

```ts
type HtmlAttributes = {
  disabled: boolean;
};
type ButtonHtmlAttributes = HtmlAttributes & {
  type: "Submit" | "Button" | null;
};
```

Next, an interface declaration is always an object, while a type declaration can be of primitive values as shown below:

接下来，一个接口声明总是一个对象，而类型声明可以是原始值，如下所示。

```ts
type isLoading = boolean;
type Theme = "dark" | "light";
type Lang = "en" | "fr";
```

None of the above examples are possible with an interface , so a type might be preferred for simple Context object values.

The question is when to use one over the other? From the TypeScript Handbook again:

上述例子中没有一个是可以用接口的，所以对于简单的 Context 对象值来说，类型可能是首选。

问题是什么时候使用一个而不是另一个？再从 TypeScript 手册上看。

> If you would like a heuristic, use interface until you need to use features from type.
> 如果你想要一个启发式的方法，请使用接口，直到你需要使用类型中的功能。

The TypeScript code analyzer will tell you when you strictly need to use either an interface or a type.

When you’re not sure which one to use, always go with interface until you see a reason to use type .

If you need more details, here’s a [StackOverflow answer](https://stackoverflow.com/a/65948871) comparing interfaces and types.

TypeScript 代码分析器会告诉你什么时候你需要严格使用接口或类型。

当你不确定使用哪一个时，总是选择接口，直到你看到有理由使用类型。

如果你需要更多细节，这里有一个 StackOverflow 的答案，比较了接口和类型。

## Conclusion

Through this tutorial, you’ve learned the most common typings you may need when developing a React-TypeScript application.

I hope this cheat sheet will be useful for your next project 🙏

通过本教程，你已经学会了在开发 React-TypeScript 应用程序时可能需要的最常见的类型。

我希望这个小抄会对你的下一个项目有用 🙏。
