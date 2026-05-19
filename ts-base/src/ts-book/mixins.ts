/**
 * Mixin 模式：高阶函数接收 Constructor，返回继承并扩展的新类。
 * 用泛型 Tbase extends Constructor 保留原类实例类型，便于链式组合。
 */

type Constructor<T = {}> = new (...args: any[]) => T;

function TimesTamped<Tbase extends Constructor>(Base: Tbase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

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

class User {
  name = "";
}

const TimestampedUser = TimesTamped(User);

// 从内到外：先 Activatable(User)，再 TimesTamped(...)
const TimestampedActivatableuser = TimesTamped(Activatable(User));

const timestampedUserExample = new TimestampedUser();
console.log(timestampedUserExample.timestamp);

const timestampedActivatableuserExample = new TimestampedActivatableuser();
console.log(timestampedActivatableuserExample.timestamp);
console.log(timestampedActivatableuserExample.isActivated);
