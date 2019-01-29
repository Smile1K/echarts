export const extend = function() {
    /*
     *target被扩展的对象
     *length参数的数量
     *deep是否深度操作
     */
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false; // target为第一个参数，如果第一个参数是Boolean类型的值，则把target赋值给deep // deep表示是否进行深层面的复制，当为true时，进行深度复制，否则只进行第一层扩展 // 然后把第二个参数赋值给target

    if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {}; // 将i赋值为2，跳过前两个参数

        i = 2;
    } // target既不是对象也不是函数则把target设置为空对象。

    if (typeof target !== "object" && typeof target !== "function") {
        target = {};
    } // 如果只有一个参数，则把jQuery对象赋值给target，即扩展到jQuery对象上

    if (length === i) {
        target = this; // i减1，指向被扩展对象

        --i;
    } // 开始遍历需要被扩展到target上的参数

    for (; i < length; i++) {
        // 处理第i个被扩展的对象，即除去deep和target之外的对象
        if ((options = arguments[i]) != null) {
            // 遍历第i个对象的所有可遍历的属性
            for (name in options) {
                // 根据被扩展对象的键获得目标对象相应值，并赋值给src
                src = target[name]; // 得到被扩展对象的值
                copy = options[name]; // 这里为什么是比较target和copy？不应该是比较src和copy吗？

                if (target === copy) {
                    continue;
                } // 当用户想要深度操作时，递归合并 // copy是纯对象或者是数组

                if (
                    deep &&
                    copy &&
                    (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
                ) {
                    // 如果是数组
                    if (copyIsArray) {
                        // 将copyIsArray重新设置为false，为下次遍历做准备。
                        copyIsArray = false; // 判断被扩展的对象中src是不是数组
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        // 判断被扩展的对象中src是不是纯对象
                        clone = src && isPlainObject(src) ? src : {};
                    } // 递归调用extend方法，继续进行深度遍历

                    target[name] = extend(deep, clone, copy); // 如果不需要深度复制，则直接把copy（第i个被扩展对象中被遍历的那个键的值）
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    } // 原对象被改变，因此如果不想改变原对象，target可传入{}

    return target;
}

function isPlainObject(obj) {
    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if (!obj || typeof obj !== "object" || obj.nodeType) {
        return false;
    }

    try {
        // Not own constructor property must be Object
        if (
            obj.constructor &&
            hasOwnProperty.call(obj, "constructor") &&
            hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")
        ) {
            return false;
        }
    } catch (e) {
        // IE8,9 Will throw exceptions on certain host objects #9897
        return false;
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.

    var key;
    for (key in obj) {}

    return key === undefined || hasOwnProperty.call(obj, key);
}


/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export const accSub = function(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return parseInt(Math.round(((arg1 * m - arg2 * m) / m).toFixed(n)));
}


export const getParams = function() {
    // debugger
    var url = window.location.search;
    var theRequest = new Object();
    if(url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}