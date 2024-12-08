interface Options {
  favouriteNumber: number;
}

const defaultOptions: Options = {
  favouriteNumber: 42,
};

export default ((userOpts?: Options) => {
  const opts = { ...userOpts, ...defaultOptions };
  
  function YourComponent(props: QuartzComponentProps) {
    if (opts.favouriteNumber < 0) {
      return null; // Do not render if the condition is met
    }

    return <p>My favourite number is {opts.favouriteNumber}</p>;
  }

  return YourComponent;
}) satisfies QuartzComponentConstructor; 