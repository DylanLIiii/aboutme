**Imitation Learning** is a reinforcement learning approach that leverages expert demonstrations to learn a policy. Unlike traditional methods, Imitation Learning doesn't require a prior reward function; instead, it utilizes expert behaviors.

> Other learning approaches include: _Learning from Environment Observation (common in most RL methods) and Learning from Other Tasks (Transfer Learning and Meta Learning)._

**How do we utilize expert demonstrations?**

1. The most intuitive approach is to apply supervised learning to expert demonstrations. We collect expert trajectories/behaviors, which then serve as a supervisory signal for our policy. We can use _regression_ and _classification_ methods to fit this data. This method is called **Behavior Cloning.**
    
    > As this method stems from supervised learning, it inherits its drawbacks. Additionally, it introduces new challenges that can compromise its effectiveness—lack of i.i.d assumption (Distribution Shift), Markov Property Assumption, and Multimodal Behavior.
    
2. The second approach addresses the reward/cost function in reinforcement learning. Complex systems often make it difficult to design manual reward functions. Given that we have expert behaviors, can we learn a model (in this case, the reward function) to extract a new policy? More formally, we can learn a parameterized reward function; this is typically called **Inverse Reinforcement Learning (IRL)**.
    

There are several imitation learning algorithms. **Behavior Cloning and Dagger** are the most basic algorithms, with many derivatives based on them. These methods directly use expert trajectories as supervised learning data.

If we aim to derive a reward function from expert demonstrations, there are also several basic IRL methods—[Maximum Entropy Inverse Reinforcement Learning (max-ent IRL)](https://github.com/tsmatz/imitation-learning-tutorials/blob/master/03_maxent_irl.ipynb), [Maximum Causal Entropy Inverse Reinforcement Learning (MCE IRL)](https://github.com/tsmatz/imitation-learning-tutorials/blob/master/04_mce_irl.ipynb), [Relative Entropy Inverse Reinforcement Learning (rel-ent IRL)](https://github.com/tsmatz/imitation-learning-tutorials/blob/master/05_relent_irl.ipynb), and [Generative Adversarial Imitation Learning (GAIL)](https://github.com/tsmatz/imitation-learning-tutorials/blob/master/06_gail.ipynb).

> The entropy methods are primarily based on **Feature Expectation Matching**—an approach that assumes a linear relationship between trajectory rewards and features extracted from _state or state-action pairs_. GAIL proposes a way to calculate the nonlinear relationship between trajectory rewards and features.

---

## General Reinforcement Learning

Before diving into Imitation Learning, lets go through the framework of reinforcement learning.

Reinforcement Learning deals with **agents** interacting within a certain **environment**, observing its **state**, performing **actions** and obtaining **rewards**. The goal is to learn an optimal **policy**, i.e. a mapping from observations to actions, that maximizes the total reward.

### Formal of Markov Decision Process in Reinforcement Learning

In generation, the interaction of the agent with the environments can be defined as a **Markov Decision Process (MDP)**. The elements of this MDP are the state space $S$, the action space $A$, the reward or cost $r$ or $c$ , and the transition operator $\mathcal{T}$ and the policy $\pi(a ,s)$, and we also introduce the Time Horizon $T$, which can be infinite and finite too. We always define the observation space $O$, which stems from the state space $S$.

Figure 1. MDP with observation and action.

When we specifics to state $s_t$ in time $t$, we have and the transitation operator $p(s_{t+1}|s_t, a_t)$. The whole process can be shown as Figure1.

<aside> 📌

**OBSERVATION vs STATE**

It's crucial to understand that an agent's perception often differs from the environment's actual state. What the agent perceives is typically a—possibly noisy—**observation**, denoted as $o \in O$. States represent the underlying circumstances that generate these observations, varying based on the desired level of abstraction. While states fully describe the environment, observations only provide partial information. **This relationship isn't bijective, as multiple states can yield the same observation.** Despite this distinction, the terms are frequently used interchangeably.

In this Markov Decision Process (MDP), we're dealing with a discrete-time stochastic control process that adheres to the **Markov property**. This property states that the conditional probability distribution of **future states** (given both **past and present states**) **depends solely on the present state, not on the sequence of preceding events**.

This insight underscores the paramount importance of state in Reinforcement Learning, surpassing even that of actions and observations. It's worth noting that researchers sometimes conflate these concepts. Additionally, it's important to recognize that **observations do NOT necessarily satisfy the Markov property, whereas states do**.

</aside>

<aside> 📌

If the environment transitions and rewards are known, the optimal policy can be found using **Dynamic Programming (DP)** approaches. Otherwise, we need to use RL methods.

</aside>

Now we can define a trajectory $\tau$, the probability of this trajectory can be written as

$$ p(\tau) = p_\theta(s_1, a_1, \ldots, s_T, a_T) = {p(s_1) \prod_{t=1}^T \pi_\theta(a_t|s_t) p(s_{t+1}|s_t, a_t)} $$

where $\pi_\theta(a_t|s_t) p(s_{t+1}|s_t, a_t)$ is the Markov transition from $a_t$ to $s_{t+1}$. And our expectation is that to find a set of parameters $\theta$ can maximize the expectation reward over whole trajectories:

### **Finite Horizon Case, where $T$ is finite here.**

$$ \theta^* = \text{argmax}_\theta \sum_t E_{(s_t,a_t)\sim p_\theta(s_t,a_t)}[r(s_t,a_t)] = \text{argmax}_\theta\sum_t \sum_{(s,a)\in\mathcal{S}\times\mathcal{A}} p(s_t=s,a_t=a|\pi_\theta)\cdot r(s_t=s,a_t=a) $$

See [[Explained Reward Expectation]] for more details. We can see this is the marginal probability of state and action pair.

### **Infinite Horizon Case**, Where $T$ is infinite here.

**In this case, $p(s_t, a_t)$ will converge to a _stationary_ distribution.**

We define the stationary distribution is $\mu = p_\theta(s, a)$, the stationary means that we got same distribution before and after the transition operator applied: $\mu = \mathcal{T} \mu$, **which means that $\mu$ is a eigenvector of $\mathcal{T}$ with eigenvalue 1.**

So we have following

$$ \theta^* = \text{argmax}_\theta E_{(s,a)\sim p_\theta(s,a)}[r(s,a)] $$

> [!info] **OPTIMIZATION CHALLENGES WITH REWARD FUNCTIONS**
> The reward function isn't always smooth in . So how can we efficiently optimize the expectation?
> The answer lies in the nature of policies. A policy can be either **stochastic** or **deterministic**. In the deterministic case, the probability of the chosen action is 1, while others are 0. Generally, we prefer stochastic policies. Consider a game of rock-paper-scissors—a deterministic strategy would be easily exploited by an opponent.
> A deeper look reveals that deterministic policies can cause optimization issues because the expectation isn't smooth . This occurs because the policy output is a one-hot distribution rather than a regular probability distribution.

