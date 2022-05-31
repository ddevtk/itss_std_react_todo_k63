/*
  【Filterコンポーネント】
 ・該当するTodoをステータス毎にで分けてリスト表示する
 ・タブで表示する
 ・サポートするステータスは「すべて」「未完了」「完了済み」
*/
function Filter({ status, setStatus }) {
  return (
    <div className="panel-tabs">
      {Object.entries(status).map((e, id) => {
        return <p key={id} className={`text-blue ${e[1] ? 'is-active' : ''}`} onClick={() => {
          setStatus({ 'すべて': false, '未完了': false, '完了済み': false, [e[0]]: true })
        }} >{e[0]}</p>
      })}
    </div>
  );
}

export default Filter