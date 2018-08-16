/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/chapters/ch01/index.md");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chapters/ch01/images/fib.png":
/*!******************************************!*\
  !*** ./src/chapters/ch01/images/fib.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,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\"//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY2hhcHRlcnMvY2gwMS9pbWFnZXMvZmliLnBuZy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jaGFwdGVycy9jaDAxL2ltYWdlcy9maWIucG5nP2U5MTYiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBTnNBQUFCVkNBSUFBQUJQV3dhL0FBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQUFKY0VoWmN3QUFEc01BQUE3REFjZHZxR1FBQUFBU2RFVllkRk52Wm5SM1lYSmxBRWR5WldWdWMyaHZkRjVWQ0FVQUFBb0NTVVJCVkhoZTdaMTVVQlJYSHNkRnJrWGpTcGIxaXJKZXdaQzRtaWk2cm9sbmlJQ3gxS1hXQXhRdkJnL2lGY0VEUEVCQlJkY0lTdkJBTVF6M3BiQkVCUXFvVW5TUWdKUjRCaWxVQmd1SlVBTk13VkRNMUhUWGJBOE1DOEpBZDBQUHpJL2g5L25MZnM3QW0vYysvZDdybnU5ckJpZ1FCQkpvSkFJTE5CS0JCUnFKd0FLTlJHQ0JSaUt3UUNNUldLQ1JDQ3pRU0FRV2FDUUNDelFTZ1FVYWljQUNqVVJnZ1VZaXNFQWpFVmlna1FnczBFZ0VGbWdrQWdzMEVvRUZHb25BQW8xRVlBSE9TR25acjE3ZlRuR0tyaUpWQlFnN3lQY0YvLzIxU05UV2ZFUkZWdEFlM3ZvTld3OEVad2xWWllDQlpXUmRqdS9jRVJhenZMS1orU2dyVGo2OWU5blVNUlBuYnp6azUwOXg5SkNuMjFLYlR4ZjRGOHBWTDlFMk9xK1MvT2xSRzJPVGI4NjhJbHFPNnpOM1dvOVpjdUgzdW95dFk0ekhiR2twMUNoRXpjT3JQcGNMWktwRHRnQXlraXlQZGJJMEdic3hoYzN3S0wyelk4S1F4VmZldDcxRmxuZlk3V3hyZjNBSzhmcmV2VEw2SDZ6TktxbEQ4dWJobzdkTnJRY0pxOHlIcm9oclVKQlZnckNmSWd0VXhScWlzU2cySU9BL2g1ZFBHTzZTM0ZvRHRvQXhrcXlLWFRYYzBOeit3aHMyUFNkL2RzeG0wS3dUeGUzZVE1YUhoU1JKVkFlYzBwaXdkZXNOMm9iV2FwWG9JTXNDNTVtTzNIU3pwM3BJY29OKzhEaWY4WnBONWFrR21ER2k3eHRKQ3M4dk5CczQxREd5UmxYQUNMTHk0cUtQSnUyNTN6eEQxR1VrM2xZdW54ckszclFibnppRWtaSGFyZEtIa0RWcHZpdVhPdGd1V0xnL2phcG5YZGFKZGN0c2hobWFXUzFjN2JJbnN2MDVvbEEwbGVlbHBncUVqUXFpK3ZIdE9INUVjbUdWK3FHZ3NTdzd4SFBqV3ZmamlVOXFHQTBXZW1Ka1E5eUtvUWJHWDU4dVpmU2hXMmxJZExZd2R6Z2plUGdnTXo2UXQrNkVadGRxakl6VWJwVTZJMzBaOExXeDZmTEl4dVlqb2lUZ242YWpYRzkxckxXODZGcEk1dXZRcFZOWCt3VkgzNitVTmo3eW1XOTNycHVGaGZ4OWZxU1AyeHFlZDVqZ25WUlYxZ1g2WVNRcERKeG5ZdkNucGVIMXFnSkdTTy9zbkRCa3pyNzRsT1NFOERNdTlqc3lhZHFxTytSeTJuT0JpWkhjVlltUVNsbWRuYTFVWGJJem9UTlMvaUl1SnEraDhOQlg0MXlTbWdkditYTy9XVlAyUHFDN0dpSEZMMUpPYlhkWnZ6dndkbW1EcXF3VCttRWs4ZnJNSEdNRE04ZW9sb1prUnZPS2JmYXBFbVhIa2RWSkVhbmlsbkoyRUtWcG9SZFBydjFxVlVUbk5pYXJzODc4c05sTmhhdmQ1TW4yUE5XQjIrYnQ1M0xxVksvN1A5eFVTZkw0eHNYUThJZ3JmcnhWTzJOTFdRNnlUSXhVUWxiOC9OMDQxNXZOcnlNckx6dFlya2xpTmh6SUt1K2VYUExGYkI5QkY4NzFYeU9wRlp2ZEVHdjZFNXNCOG53dkcwZmE4Wmwrak9TbVN0WGhtNWFjZlVTSlNQNXh5V0cwY3lLcmVZT3hrZUw0VlpiTHcwWEtmNUlWbHh6R09pWFVFZlhpYm4rWDVIVm04STh1cTdmNHhSZUp1cG5nKzYyUkRVbk93MFp1VE8zNERrS1l6VDkzbGk5NGN2ZDZZdnpWa1BpaUxxZVhOcmd5a3BzcXlVclRFKy8vUVUybVpGWG80dEZPQ1F3K1FCdGsxYVZGbEpFUkxWZkh4RXZLeUpHdWFxNjFwZG51Vm5OYWx1MWsxZFVsNDExdWlNVVpsL20vdC94dkI4amFwMG5IdHpxdDNSMlUxdlZzM1lyeWp1aUl0ZjNNU0VsUmpQK0JkYk0vR2ZLM2hkdDhUdkx6YXRzdVpLV0M2TmpIS2E2ZmZ4dFFVSytRM2ZOY3NDMmRmaW5IZ1pGY1Y0bWk0Y0ZoKzZXQmoxbDBMVkdTNEwxeXVzVkF3eEgvV0hQa1JzbVRLSTlsay84ODBOaHkzb2E5RVU4K21QMHBWZWRPUDFqUVVsWnpZL1BpM1pIWHIwVG50cXQxQzdMSzNGOE91cTdlNUgwdDl4Mzl5Qzh2VGo1OXhNTnA1c2loMXQvdk9PZ1hucWNxWjBOZlhrZXFoeUNhZnZQK3hqbU9Xc0dSd2lBNyszTkNxcFhseitLT2VYdDlnUGVSSzRKYTFYc1lHcG5vN3Q2alUxOXRsV2pxSkMrTjhkd2VuTjlwcGNvVnBMaGExTzY4a05hSTZqdmFTTkdZSHhWOC9Xa25UelVKRkNOZkhaOXBOTUIwY1ZqdmpWVGFiZXNRL0paVWtHWG5IT3pPRmo5OVVGQkQwNlRNakZSSVJLS2UxWTl0bFlpSzdBdkJOOTlRZzFKTlN1eHRWck4ybndlSWtXU3A3elREQWFhMmx6bG9mVW44dXUrT1A2UG1JL2tqZjhjTkFTRVhiZ3E3dTQxQ1ZBaGlmdmF3dFp5NjV0U1ZXODgxMC92c3FpUytzMi9hOEdGakxDMHRSNCt3bU9hVng4R2xXeDlDLzJadGF1M1QxTlE2QU1rbGtsN2NvK1FPZ0ZXQ2lqNGFpZlJsMEVnRUZtZ2tBZ3MwVXQvUXl3eTU5b1BRUk1tcDJjWUdRMWJHQXpheWw5bG9MYUczR1hJdEI2RmxlZnMvTnpLYXVPc3V6UDdtSWh1dE5mUXpROTZjWWRGZUVGb1pjelViYU80WXhTcXZxMlY2bVNEUUNiM05rUGNFalNRdHRCeUVKcXNpSEQ4MittUjlpc2ErTStNQytFWnFKRVBPR28wWTJkTWdkUDN6dENoK3VGcjRVWm5GWFN3U3BZOThiUWI5eFM2a09WVUlsNzR4Um5LYUllOVJmMnJDeUI0SG9adktDN0l5MHRXU2tWVllvWGFSS0w1L2FPYW9MN2NsdjlYTStNc2RmY05JVGpQa1BlbFBUUmhKL1VnT2d0Q01xTTA1YW12akdOZyt1d1VXUFRKU1NZOHo1SFJ3YjJUUGc5Q2s2TzRGNzMxNzFiTFBPelMzczlsdjQ5YlBXT2lkL2c3MmZOMkNuaG5KSUVQT3ZqK1ZjRzlrYjRMUXNvYmFHcEZhYW1vbGFoZWo4amZSenBPcy9oVmNDRDV6MWN0c3RKYmdOa1BPdmo5NzNVNGZHcW1CSURRRGFtL3l4cGxPNUtYQ2ZkUlBwMncwMEZVRzl4bHlkbWczUTY0K0NNMEpSTWxQYzgyTXJUMEZHTlBTR3N3eTVEcUF1WkhLNzU3WlpyT1pRcFlGTFRBMUhMVXhWU2VQSWtFZ3djSklsdGxzVnNqdS9XaGxaR1M5cjUvbHBaSE9zREJTazBGbzVRcmMyTURjT2FuajlSVFMzMkJqcEFiQk5CcWlBbzFFWUlGR0lyQkFJeEZZb0pINkJqNFpueE9JVW4vT25tbWhFZVFWOTJMQytKSDgwRXZ4QmUxNkd4NjYzZFhBUVRNQk1aSjg2VDNGY0lESnZHQnU0aWRjSTg3ZVk4ZTdyc3h0RWNJd3ArK1A1VU1leW5XM3E0R1Rac0pabXg2eVBNVHVVMTVyZnFZKyt0OWpWOFpDM243UkRtM3VhdUNvbWRCSWVxaHh4dUxMdzhwSGpDcVJacnVQSCsrZURmRXJlTjN1YXVDb21kQklXc2pLRU52Qk0veGZxRHBNSnZDWVpBNTNHNi9PZGpWdzFVeG9KQzNLdWcyYTJkYlV1WjZUQmkvamc0MXo2bXBYQTFmTmhFYlNJd3ExSHp6ZDk2bHFPcExsN0xheUFQd0Z2TTUyTlhEVVRFQ01KTXZPS3Y5NlNHdjBHUmJTZERkTHExMDVxaEdoS1dYZHlNbjdmd01iVXRMWnJnYU9tZ21Ja1FweHBPTkhCaWJ6ZzhvaDN1dXJ2OFg3YkVtbzhsbjFWQisvREpqemQ0LzdZTFBGT3R6VndLQ1p4QSt2SGZHSjdQWXZBMEF4VXZuZ0g1T0J3NXdUUVQ1RWdLeTR2bXZsTHY3RHNsYzV3YndWQnpPaDNpUFg4YTRHMm1hUzVYdE5OamF4OFgyc09sWUhGQ01WcFBDeWc3bmh4NDRSVUhmYnlFUXZCUmxaQmNMNmpoZWtmUk5ON1dxZ2FTYWk5bTJGdU50ZkJNWkk2ck84T0wvb3IyWlREd2h3YTBOL0JwQ1IxSG43TG5uTEYrWVRWdjlTckdZbGp2UVBRQm1wcEs0d2RNTzB6OVltVkFPZHZCRU5BODVJSlRKSkE5aHJXVVREZ0RRUzZjZWdrUWdzMEVnRUZtZ2tBZ3MwRW9FRkdvbkFBbzFFWUlGR0lyQkFJeEZZb0pFSUxOQklCQklLeGY4QWorcGF4Z2xnak5RQUFBQUFTVVZPUks1Q1lJST1cIiJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/chapters/ch01/images/fib.png\n");

/***/ }),

/***/ "./src/chapters/ch01/index.md":
/*!************************************!*\
  !*** ./src/chapters/ch01/index.md ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = \"<h1 id=\\\"prologue\\\">Prologue</h1>\\n<p>Look around you. Computers and networks are everywhere, enabling an intricate web of complex human activities: education, commerce, entertainment, research, manufacturing, health management, human communication, even war. Of the two main technological underpinnings of this amazing proliferation, one is obvious: the breathtaking pace with which advances in microelectronics and chip design have been bringing us faster and faster hardware.</p>\\n<p>This book tells the story of the other intellectual enterprise that is crucially fueling the computer revolution: <em>efficient algorithms</em>. It is a fascinating story.</p>\\n<p><em>Gather ’round and listen close.</em></p>\\n<h2 id=\\\"0-1-books-and-algorithms\\\">0.1 Books and algorithms</h2>\\n<p>Two ideas changed the world. In 1448 in the German city of Mainz a goldsmith named Johann Gutenberg discovered a way to print books by putting together movable metallic pieces. Literacy spread, the Dark Ages ended, the human intellect was liberated, science and technology triumphed, the Industrial Revolution happened. Many historians say we owe all this to typography. Imagine a world in which only an elite could read these lines! But others insist that the key development was not typography, but <em>algorithms</em>.</p>\\n<p>Today we are so used to writing numbers in decimal, that it is easy to forget that Gutenberg would write the number 1448 as MCDXLVIII. How do you add two Roman numerals? What is MCDXLVIII + DCCCXII? (And just try to think about multiplying them.) Even a clever man like Gutenberg probably only knew how to add and subtract small numbers using his fingers; for anything more complicated he had to consult an abacus specialist.</p>\\n<p>The decimal system, invented in India around AD 600, was a revolution in quantitative reasoning: using only 10 symbols, even very large numbers could be written down compactly, and arithmetic could be done efficiently on them by following elementary steps. Nonetheless these ideas took a long time to spread, hindered by traditional barriers of language, distance, and ignorance. The most influential medium of transmission turned out to be a textbook, written in Arabic in the ninth century by a man who lived in Baghdad. Al Khwarizmi laid out the basic methods for adding, multiplying, and dividing numbers—even extracting square roots and calculating digits of π. These procedures were precise, unambiguous mechanical, efficient, correct—in short, they were algorithms, a term coined to honor the wise man after\\nthe decimal system was finally adopted in Europe, many centuries later.</p>\\n<p>Since then, this decimal positional system and its numerical algorithms have played an enormous role in Western civilization. They enabled science and technology; they accelerated industry and commerce. And when, much later, the computer was finally designed, it explicitly embodied the positional system in its bits and words and arithmetic unit. Scientists everywhere then got busy developing more and more complex algorithms for all kinds of problems and inventing novel applications—ultimately changing the world.</p>\\n<h2 id=\\\"0-2-enter-fibonacci\\\">0.2 Enter Fibonacci</h2>\\n<p>Al Khwarizmi’s work could not have gained a foothold in the West were it not for the efforts of one man: 15th century Italian mathematician Leonardo Fibonacci, who saw the potential of the positional system  worked hard to develop it further and propagandize it. But today Fibonacci is most widely known for his famous sequence of numbers</p>\\n<pre><code class=\\\"language-numbers\\\">0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ... ,</code></pre>\\n<p>each the sum of its two immediate predecessors. More formally, the Fibonacci numbers Fn are generated by the simple rule.</p>\\n<p><img src=\\\"\" + __webpack_require__(/*! ./images/fib.png */ \"./src/chapters/ch01/images/fib.png\") + \"\\\" alt=\\\"Fibonacci Rule\\\"></p>\\n<p>No other sequence of numbers has been studied as extensively, or applied to more fields: biology, demography, art, architecture, music, to name just a few. And, together with the powers of 2, it is computer science’s favorite sequence.</p>\\n<p>In fact, the Fibonacci numbers grow almost as fast as the powers of 2: for example, F30 is over a million, and F100 is already 21 digits long! In general, Fn ≈ 2^0.694n (see Exercise 0.3).</p>\\n<p>But what is the precise value of F100, or of F200? Fibonacci himself would surely have wanted to know such things. To answer, we need an algorithm for computing the nth Fibonacci number.</p>\\n<h3 id=\\\"an-exponential-algorithm\\\">An exponential algorithm</h3>\\n<p>One idea is to slavishly implement the recursive definition of Fn. Here is the resulting algorithm, in the “pseudocode” notation used throughout this book:</p>\\n<pre><code class=\\\"language-pc\\\">function fib1(n)\\nif n = 0: return 0\\nif n = 1: return 1\\nreturn fib1(n − 1) + fib1(n − 2)</code></pre>\\n<p>Whenever we have an algorithm, there are three questions we always ask about it:</p>\\n<ol>\\n<li>Is it correct?</li>\\n<li>How much time does it take, as a function of n?</li>\\n<li>And can we do better?</li>\\n</ol>\\n<p>The first question is moot here, as this algorithm is precisely Fibonacci’s definition of Fn. But the second demands an answer. Let T(n) be the number of computer steps needed to compute fib1(n); what can we say about this function? For starters, if n is less than 2, the procedure halts almost immediately, after just a couple of steps. Therefore,</p>\\n<pre><code class=\\\"language-math\\\">T(n) ≤ 2 for n ≤ 1.</code></pre>\\n<p>For larger values of n, there are two recursive invocations of fib1, taking time T(n − 1) and T(n−2), respectively, plus three computer steps (checks on the value of n and a final addition). Therefore,</p>\\n<pre><code class=\\\"language-math\\\">T(n) = T(n − 1) + T(n − 2) + 3 for n &gt; 1</code></pre>\\n\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY2hhcHRlcnMvY2gwMS9pbmRleC5tZC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jaGFwdGVycy9jaDAxL2luZGV4Lm1kPzc1ZDgiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIjxoMSBpZD1cXFwicHJvbG9ndWVcXFwiPlByb2xvZ3VlPC9oMT5cXG48cD5Mb29rIGFyb3VuZCB5b3UuIENvbXB1dGVycyBhbmQgbmV0d29ya3MgYXJlIGV2ZXJ5d2hlcmUsIGVuYWJsaW5nIGFuIGludHJpY2F0ZSB3ZWIgb2YgY29tcGxleCBodW1hbiBhY3Rpdml0aWVzOiBlZHVjYXRpb24sIGNvbW1lcmNlLCBlbnRlcnRhaW5tZW50LCByZXNlYXJjaCwgbWFudWZhY3R1cmluZywgaGVhbHRoIG1hbmFnZW1lbnQsIGh1bWFuIGNvbW11bmljYXRpb24sIGV2ZW4gd2FyLiBPZiB0aGUgdHdvIG1haW4gdGVjaG5vbG9naWNhbCB1bmRlcnBpbm5pbmdzIG9mIHRoaXMgYW1hemluZyBwcm9saWZlcmF0aW9uLCBvbmUgaXMgb2J2aW91czogdGhlIGJyZWF0aHRha2luZyBwYWNlIHdpdGggd2hpY2ggYWR2YW5jZXMgaW4gbWljcm9lbGVjdHJvbmljcyBhbmQgY2hpcCBkZXNpZ24gaGF2ZSBiZWVuIGJyaW5naW5nIHVzIGZhc3RlciBhbmQgZmFzdGVyIGhhcmR3YXJlLjwvcD5cXG48cD5UaGlzIGJvb2sgdGVsbHMgdGhlIHN0b3J5IG9mIHRoZSBvdGhlciBpbnRlbGxlY3R1YWwgZW50ZXJwcmlzZSB0aGF0IGlzIGNydWNpYWxseSBmdWVsaW5nIHRoZSBjb21wdXRlciByZXZvbHV0aW9uOiA8ZW0+ZWZmaWNpZW50IGFsZ29yaXRobXM8L2VtPi4gSXQgaXMgYSBmYXNjaW5hdGluZyBzdG9yeS48L3A+XFxuPHA+PGVtPkdhdGhlciDigJlyb3VuZCBhbmQgbGlzdGVuIGNsb3NlLjwvZW0+PC9wPlxcbjxoMiBpZD1cXFwiMC0xLWJvb2tzLWFuZC1hbGdvcml0aG1zXFxcIj4wLjEgQm9va3MgYW5kIGFsZ29yaXRobXM8L2gyPlxcbjxwPlR3byBpZGVhcyBjaGFuZ2VkIHRoZSB3b3JsZC4gSW4gMTQ0OCBpbiB0aGUgR2VybWFuIGNpdHkgb2YgTWFpbnogYSBnb2xkc21pdGggbmFtZWQgSm9oYW5uIEd1dGVuYmVyZyBkaXNjb3ZlcmVkIGEgd2F5IHRvIHByaW50IGJvb2tzIGJ5IHB1dHRpbmcgdG9nZXRoZXIgbW92YWJsZSBtZXRhbGxpYyBwaWVjZXMuIExpdGVyYWN5IHNwcmVhZCwgdGhlIERhcmsgQWdlcyBlbmRlZCwgdGhlIGh1bWFuIGludGVsbGVjdCB3YXMgbGliZXJhdGVkLCBzY2llbmNlIGFuZCB0ZWNobm9sb2d5IHRyaXVtcGhlZCwgdGhlIEluZHVzdHJpYWwgUmV2b2x1dGlvbiBoYXBwZW5lZC4gTWFueSBoaXN0b3JpYW5zIHNheSB3ZSBvd2UgYWxsIHRoaXMgdG8gdHlwb2dyYXBoeS4gSW1hZ2luZSBhIHdvcmxkIGluIHdoaWNoIG9ubHkgYW4gZWxpdGUgY291bGQgcmVhZCB0aGVzZSBsaW5lcyEgQnV0IG90aGVycyBpbnNpc3QgdGhhdCB0aGUga2V5IGRldmVsb3BtZW50IHdhcyBub3QgdHlwb2dyYXBoeSwgYnV0IDxlbT5hbGdvcml0aG1zPC9lbT4uPC9wPlxcbjxwPlRvZGF5IHdlIGFyZSBzbyB1c2VkIHRvIHdyaXRpbmcgbnVtYmVycyBpbiBkZWNpbWFsLCB0aGF0IGl0IGlzIGVhc3kgdG8gZm9yZ2V0IHRoYXQgR3V0ZW5iZXJnIHdvdWxkIHdyaXRlIHRoZSBudW1iZXIgMTQ0OCBhcyBNQ0RYTFZJSUkuIEhvdyBkbyB5b3UgYWRkIHR3byBSb21hbiBudW1lcmFscz8gV2hhdCBpcyBNQ0RYTFZJSUkgKyBEQ0NDWElJPyAoQW5kIGp1c3QgdHJ5IHRvIHRoaW5rIGFib3V0IG11bHRpcGx5aW5nIHRoZW0uKSBFdmVuIGEgY2xldmVyIG1hbiBsaWtlIEd1dGVuYmVyZyBwcm9iYWJseSBvbmx5IGtuZXcgaG93IHRvIGFkZCBhbmQgc3VidHJhY3Qgc21hbGwgbnVtYmVycyB1c2luZyBoaXMgZmluZ2VyczsgZm9yIGFueXRoaW5nIG1vcmUgY29tcGxpY2F0ZWQgaGUgaGFkIHRvIGNvbnN1bHQgYW4gYWJhY3VzIHNwZWNpYWxpc3QuPC9wPlxcbjxwPlRoZSBkZWNpbWFsIHN5c3RlbSwgaW52ZW50ZWQgaW4gSW5kaWEgYXJvdW5kIEFEIDYwMCwgd2FzIGEgcmV2b2x1dGlvbiBpbiBxdWFudGl0YXRpdmUgcmVhc29uaW5nOiB1c2luZyBvbmx5IDEwIHN5bWJvbHMsIGV2ZW4gdmVyeSBsYXJnZSBudW1iZXJzIGNvdWxkIGJlIHdyaXR0ZW4gZG93biBjb21wYWN0bHksIGFuZCBhcml0aG1ldGljIGNvdWxkIGJlIGRvbmUgZWZmaWNpZW50bHkgb24gdGhlbSBieSBmb2xsb3dpbmcgZWxlbWVudGFyeSBzdGVwcy4gTm9uZXRoZWxlc3MgdGhlc2UgaWRlYXMgdG9vayBhIGxvbmcgdGltZSB0byBzcHJlYWQsIGhpbmRlcmVkIGJ5IHRyYWRpdGlvbmFsIGJhcnJpZXJzIG9mIGxhbmd1YWdlLCBkaXN0YW5jZSwgYW5kIGlnbm9yYW5jZS4gVGhlIG1vc3QgaW5mbHVlbnRpYWwgbWVkaXVtIG9mIHRyYW5zbWlzc2lvbiB0dXJuZWQgb3V0IHRvIGJlIGEgdGV4dGJvb2ssIHdyaXR0ZW4gaW4gQXJhYmljIGluIHRoZSBuaW50aCBjZW50dXJ5IGJ5IGEgbWFuIHdobyBsaXZlZCBpbiBCYWdoZGFkLiBBbCBLaHdhcml6bWkgbGFpZCBvdXQgdGhlIGJhc2ljIG1ldGhvZHMgZm9yIGFkZGluZywgbXVsdGlwbHlpbmcsIGFuZCBkaXZpZGluZyBudW1iZXJz4oCUZXZlbiBleHRyYWN0aW5nIHNxdWFyZSByb290cyBhbmQgY2FsY3VsYXRpbmcgZGlnaXRzIG9mIM+ALiBUaGVzZSBwcm9jZWR1cmVzIHdlcmUgcHJlY2lzZSwgdW5hbWJpZ3VvdXMgbWVjaGFuaWNhbCwgZWZmaWNpZW50LCBjb3JyZWN04oCUaW4gc2hvcnQsIHRoZXkgd2VyZSBhbGdvcml0aG1zLCBhIHRlcm0gY29pbmVkIHRvIGhvbm9yIHRoZSB3aXNlIG1hbiBhZnRlclxcbnRoZSBkZWNpbWFsIHN5c3RlbSB3YXMgZmluYWxseSBhZG9wdGVkIGluIEV1cm9wZSwgbWFueSBjZW50dXJpZXMgbGF0ZXIuPC9wPlxcbjxwPlNpbmNlIHRoZW4sIHRoaXMgZGVjaW1hbCBwb3NpdGlvbmFsIHN5c3RlbSBhbmQgaXRzIG51bWVyaWNhbCBhbGdvcml0aG1zIGhhdmUgcGxheWVkIGFuIGVub3Jtb3VzIHJvbGUgaW4gV2VzdGVybiBjaXZpbGl6YXRpb24uIFRoZXkgZW5hYmxlZCBzY2llbmNlIGFuZCB0ZWNobm9sb2d5OyB0aGV5IGFjY2VsZXJhdGVkIGluZHVzdHJ5IGFuZCBjb21tZXJjZS4gQW5kIHdoZW4sIG11Y2ggbGF0ZXIsIHRoZSBjb21wdXRlciB3YXMgZmluYWxseSBkZXNpZ25lZCwgaXQgZXhwbGljaXRseSBlbWJvZGllZCB0aGUgcG9zaXRpb25hbCBzeXN0ZW0gaW4gaXRzIGJpdHMgYW5kIHdvcmRzIGFuZCBhcml0aG1ldGljIHVuaXQuIFNjaWVudGlzdHMgZXZlcnl3aGVyZSB0aGVuIGdvdCBidXN5IGRldmVsb3BpbmcgbW9yZSBhbmQgbW9yZSBjb21wbGV4IGFsZ29yaXRobXMgZm9yIGFsbCBraW5kcyBvZiBwcm9ibGVtcyBhbmQgaW52ZW50aW5nIG5vdmVsIGFwcGxpY2F0aW9uc+KAlHVsdGltYXRlbHkgY2hhbmdpbmcgdGhlIHdvcmxkLjwvcD5cXG48aDIgaWQ9XFxcIjAtMi1lbnRlci1maWJvbmFjY2lcXFwiPjAuMiBFbnRlciBGaWJvbmFjY2k8L2gyPlxcbjxwPkFsIEtod2FyaXptaeKAmXMgd29yayBjb3VsZCBub3QgaGF2ZSBnYWluZWQgYSBmb290aG9sZCBpbiB0aGUgV2VzdCB3ZXJlIGl0IG5vdCBmb3IgdGhlIGVmZm9ydHMgb2Ygb25lIG1hbjogMTV0aCBjZW50dXJ5IEl0YWxpYW4gbWF0aGVtYXRpY2lhbiBMZW9uYXJkbyBGaWJvbmFjY2ksIHdobyBzYXcgdGhlIHBvdGVudGlhbCBvZiB0aGUgcG9zaXRpb25hbCBzeXN0ZW0gIHdvcmtlZCBoYXJkIHRvIGRldmVsb3AgaXQgZnVydGhlciBhbmQgcHJvcGFnYW5kaXplIGl0LiBCdXQgdG9kYXkgRmlib25hY2NpIGlzIG1vc3Qgd2lkZWx5IGtub3duIGZvciBoaXMgZmFtb3VzIHNlcXVlbmNlIG9mIG51bWJlcnM8L3A+XFxuPHByZT48Y29kZSBjbGFzcz1cXFwibGFuZ3VhZ2UtbnVtYmVyc1xcXCI+MCwgMSwgMSwgMiwgMywgNSwgOCwgMTMsIDIxLCAzNCwgLi4uICw8L2NvZGU+PC9wcmU+XFxuPHA+ZWFjaCB0aGUgc3VtIG9mIGl0cyB0d28gaW1tZWRpYXRlIHByZWRlY2Vzc29ycy4gTW9yZSBmb3JtYWxseSwgdGhlIEZpYm9uYWNjaSBudW1iZXJzIEZuIGFyZSBnZW5lcmF0ZWQgYnkgdGhlIHNpbXBsZSBydWxlLjwvcD5cXG48cD48aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWFnZXMvZmliLnBuZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIkZpYm9uYWNjaSBSdWxlXFxcIj48L3A+XFxuPHA+Tm8gb3RoZXIgc2VxdWVuY2Ugb2YgbnVtYmVycyBoYXMgYmVlbiBzdHVkaWVkIGFzIGV4dGVuc2l2ZWx5LCBvciBhcHBsaWVkIHRvIG1vcmUgZmllbGRzOiBiaW9sb2d5LCBkZW1vZ3JhcGh5LCBhcnQsIGFyY2hpdGVjdHVyZSwgbXVzaWMsIHRvIG5hbWUganVzdCBhIGZldy4gQW5kLCB0b2dldGhlciB3aXRoIHRoZSBwb3dlcnMgb2YgMiwgaXQgaXMgY29tcHV0ZXIgc2NpZW5jZeKAmXMgZmF2b3JpdGUgc2VxdWVuY2UuPC9wPlxcbjxwPkluIGZhY3QsIHRoZSBGaWJvbmFjY2kgbnVtYmVycyBncm93IGFsbW9zdCBhcyBmYXN0IGFzIHRoZSBwb3dlcnMgb2YgMjogZm9yIGV4YW1wbGUsIEYzMCBpcyBvdmVyIGEgbWlsbGlvbiwgYW5kIEYxMDAgaXMgYWxyZWFkeSAyMSBkaWdpdHMgbG9uZyEgSW4gZ2VuZXJhbCwgRm4g4omIIDJeMC42OTRuIChzZWUgRXhlcmNpc2UgMC4zKS48L3A+XFxuPHA+QnV0IHdoYXQgaXMgdGhlIHByZWNpc2UgdmFsdWUgb2YgRjEwMCwgb3Igb2YgRjIwMD8gRmlib25hY2NpIGhpbXNlbGYgd291bGQgc3VyZWx5IGhhdmUgd2FudGVkIHRvIGtub3cgc3VjaCB0aGluZ3MuIFRvIGFuc3dlciwgd2UgbmVlZCBhbiBhbGdvcml0aG0gZm9yIGNvbXB1dGluZyB0aGUgbnRoIEZpYm9uYWNjaSBudW1iZXIuPC9wPlxcbjxoMyBpZD1cXFwiYW4tZXhwb25lbnRpYWwtYWxnb3JpdGhtXFxcIj5BbiBleHBvbmVudGlhbCBhbGdvcml0aG08L2gzPlxcbjxwPk9uZSBpZGVhIGlzIHRvIHNsYXZpc2hseSBpbXBsZW1lbnQgdGhlIHJlY3Vyc2l2ZSBkZWZpbml0aW9uIG9mIEZuLiBIZXJlIGlzIHRoZSByZXN1bHRpbmcgYWxnb3JpdGhtLCBpbiB0aGUg4oCccHNldWRvY29kZeKAnSBub3RhdGlvbiB1c2VkIHRocm91Z2hvdXQgdGhpcyBib29rOjwvcD5cXG48cHJlPjxjb2RlIGNsYXNzPVxcXCJsYW5ndWFnZS1wY1xcXCI+ZnVuY3Rpb24gZmliMShuKVxcbmlmIG4gPSAwOiByZXR1cm4gMFxcbmlmIG4gPSAxOiByZXR1cm4gMVxcbnJldHVybiBmaWIxKG4g4oiSIDEpICsgZmliMShuIOKIkiAyKTwvY29kZT48L3ByZT5cXG48cD5XaGVuZXZlciB3ZSBoYXZlIGFuIGFsZ29yaXRobSwgdGhlcmUgYXJlIHRocmVlIHF1ZXN0aW9ucyB3ZSBhbHdheXMgYXNrIGFib3V0IGl0OjwvcD5cXG48b2w+XFxuPGxpPklzIGl0IGNvcnJlY3Q/PC9saT5cXG48bGk+SG93IG11Y2ggdGltZSBkb2VzIGl0IHRha2UsIGFzIGEgZnVuY3Rpb24gb2Ygbj88L2xpPlxcbjxsaT5BbmQgY2FuIHdlIGRvIGJldHRlcj88L2xpPlxcbjwvb2w+XFxuPHA+VGhlIGZpcnN0IHF1ZXN0aW9uIGlzIG1vb3QgaGVyZSwgYXMgdGhpcyBhbGdvcml0aG0gaXMgcHJlY2lzZWx5IEZpYm9uYWNjaeKAmXMgZGVmaW5pdGlvbiBvZiBGbi4gQnV0IHRoZSBzZWNvbmQgZGVtYW5kcyBhbiBhbnN3ZXIuIExldCBUKG4pIGJlIHRoZSBudW1iZXIgb2YgY29tcHV0ZXIgc3RlcHMgbmVlZGVkIHRvIGNvbXB1dGUgZmliMShuKTsgd2hhdCBjYW4gd2Ugc2F5IGFib3V0IHRoaXMgZnVuY3Rpb24/IEZvciBzdGFydGVycywgaWYgbiBpcyBsZXNzIHRoYW4gMiwgdGhlIHByb2NlZHVyZSBoYWx0cyBhbG1vc3QgaW1tZWRpYXRlbHksIGFmdGVyIGp1c3QgYSBjb3VwbGUgb2Ygc3RlcHMuIFRoZXJlZm9yZSw8L3A+XFxuPHByZT48Y29kZSBjbGFzcz1cXFwibGFuZ3VhZ2UtbWF0aFxcXCI+VChuKSDiiaQgMiBmb3IgbiDiiaQgMS48L2NvZGU+PC9wcmU+XFxuPHA+Rm9yIGxhcmdlciB2YWx1ZXMgb2YgbiwgdGhlcmUgYXJlIHR3byByZWN1cnNpdmUgaW52b2NhdGlvbnMgb2YgZmliMSwgdGFraW5nIHRpbWUgVChuIOKIkiAxKSBhbmQgVChu4oiSMiksIHJlc3BlY3RpdmVseSwgcGx1cyB0aHJlZSBjb21wdXRlciBzdGVwcyAoY2hlY2tzIG9uIHRoZSB2YWx1ZSBvZiBuIGFuZCBhIGZpbmFsIGFkZGl0aW9uKS4gVGhlcmVmb3JlLDwvcD5cXG48cHJlPjxjb2RlIGNsYXNzPVxcXCJsYW5ndWFnZS1tYXRoXFxcIj5UKG4pID0gVChuIOKIkiAxKSArIFQobiDiiJIgMikgKyAzIGZvciBuICZndDsgMTwvY29kZT48L3ByZT5cXG5cIjsiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/chapters/ch01/index.md\n");

/***/ })

/******/ });