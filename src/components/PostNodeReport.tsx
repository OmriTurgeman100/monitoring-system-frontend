type id_props = {
  id: string | undefined;
};

export const PostNodeReport = (props: id_props) => {
  return (
    <div>
      <h1>test {props.id} </h1>
    </div>
  );
};
