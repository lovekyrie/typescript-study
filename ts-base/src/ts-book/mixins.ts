//所有mixins都需要
type Constructor<T = {}> = new (...args: any[]) => T;

/////////////
// mixins 例子
////////////

// 添加属性的混合例子
function TimesTamped<Tbase extends Constructor>(Base: Tbase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

// 添加属性跟方法的混合例子
function Activatable<Tbase extends Constructor>(Base: Tbase) {
  return class extends Base {
    isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  };
}

/////////////
// 组合类
////////////

//简单的类
class User {
  name = "";
}

//添加TimesTamped的User
const TimestampedUser = TimesTamped(User);

//添加TimesTamped和Activatable的类
const TimestampedActivatableuser = TimesTamped(Activatable(User));

const timestampedUserExample = new TimestampedUser();
console.log(timestampedUserExample.timestamp);

const timestampedActivatableuserExample = new TimestampedActivatableuser();
console.log(timestampedActivatableuserExample.timestamp);
console.log(timestampedActivatableuserExample.isActivated);
