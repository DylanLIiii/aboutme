# Expected Rewards in Reinforcement Learning Trajectories

## Trajectory and Cumulative Reward

Let us consider a trajectory $\tau$ in a reinforcement learning environment, defined as a sequence of states and actions:

$$\tau = (s_1, a_1, s_2, a_2, \ldots) \in \mathcal{T}$$

where $\mathcal{T}$ represents the set of all possible trajectories. For any given trajectory, we can compute its cumulative reward as:

$$ R(\tau) = \sum_{(s,a)\in\tau} r(s,a) \equiv \sum_t r(s_t, a_t) $$

This represents the total reward accumulated along the trajectory by summing the immediate rewards $r(s,a)$ received at each step.

## Trajectory Probability Under a Policy

Given a policy $\pi_\theta$, each trajectory has an associated probability of occurrence. This probability can be decomposed as:

$$ p_{\pi_\theta}(\tau) \equiv p_\theta(\tau) = p(s_1)\prod_{t=1}^T \pi_\theta(a_t|s_t)p(s_{t+1}|s_t,a_t) $$

where:

- $p(s_1)$ is the initial state probability
- $\pi_\theta(a_t|s_t)$ is the probability of selecting action $a_t$ in state $s_t$ under policy $\pi_\theta$
- $p(s_{t+1}|s_t,a_t)$ is the environment transition probability

## Expected Policy Reward

The expected reward under a policy $\pi_\theta$ is calculated by considering all possible trajectories, their probabilities, and their associated rewards:

$$ E_{\tau\sim p_\theta(\tau)}[R(\tau)] = \sum_{\tau\in\mathcal{T}} p_{\pi_\theta}(\tau) \cdot R(\tau) $$

This can be equivalently written in terms of the sum of immediate rewards:

$$ E_{\tau\sim p_\theta(\tau)}[R(\tau)] \equiv E_{\tau\sim p_\theta(\tau)}\left[\sum_{t=1}^T r(s_t,a_t)\right] $$

## Alternative Formulation Using State-Action Pairs

Instead of considering complete trajectories, we can reformulate the expected reward in terms of the probability of encountering specific state-action pairs at each time step. This leads to:

$$ \sum_t E_{(s_t,a_t)\sim p_\theta(s_t,a_t)}[r(s_t,a_t)] = \sum_t \sum_{(s,a)\in\mathcal{S}\times\mathcal{A}} p(s_t=s,a_t=a|\pi_\theta)\cdot r(s_t=s,a_t=a) $$

where:

- $\mathcal{S}$ is the state space
- $\mathcal{A}$ is the action space
- $p(s_t=s,a_t=a|\pi_\theta)$ represents the probability of being in state $s$ and taking action $a$ at time $t$under policy $\pi_\theta$