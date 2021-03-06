/*
Copyright 2016-2017 Resin.io

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Github Events --------------------------------------------------------------
// These provide the current bare minimum definitions for child Procbots working with them.
// For more details on the properties within them, see the Github Event docs here:
// https://developer.github.com/v3/activity/events/types/

export interface PullRequestEvent {
	type: 'pull_request';
	action: string;
	pull_request: PullRequest;
	label?: Label;
	sender: User;
}

export interface PullRequestReviewEvent {
	type: 'pull_request_review';
	action: string;
	pull_request: PullRequest;
	sender: User;
}

export interface StatusEvent {
	context: string;
	name: string;
	sha: string;
	branches: StatusEventBranch[];
	sender: User;
}

export interface PushEventCommit {
	sha: string;
	message: string;
	added: string[];
	removed: string[];
	modified: string[];
	timestamp: string;
}

export interface PushEvent {
	type: 'push';
	action: string;
	before: string;
	after: string;
	commits: PushEventCommit[];
	head_commit: PushEventCommit;
	repository: {
		name: string;
		full_name: string;
		owner: {
			name: string;
		}
	};
}

export interface StatusEventBranch {
	name: string;
	commit: {
		author: User;
		sha: string;
		url: string;
	};
	sender: User;
}

// Github API -----------------------------------------------------------------
// These provide the current bare minimum definitions for child Procbots working with them.
// For more details on the properties within them, see the Github API docs here: https://developer.github.com/v3/

export interface Blob {
	sha: string;
}

export interface CombinedStatus {
	state: string;
	total_count: number;
	statuses: Status[];
}

export interface Comment {
	body: string;
	user: User;
	created_at: string;
	updated_at: string;
}

export interface Commit {
	committer: User;
	commit: {
		committer: {
			name: string;
			date: string;
		}
		message: string;
	};
	files: CommitFile[];
	sha: string;
}

export interface CommitFile {
	filename: string;
}

export interface Content {
	type: string;
	encoding: string;
	size: number;
	name: string;
	path: string;
	content: string;
	sha: string;
}

export interface GitDataTag {
	sha: string;
}

export interface Issue {
	body: string;
	comments: number;
	state: string;
	title: string;
}

export interface IssueComment {
	body: string;
}

export interface IssueLabel {
	default: boolean;
	id: string;
	name: string;
}

export interface Label {
	id: string;
	name: string;
	default: boolean;
}

export interface Merge {
	sha: string;
}

export interface PullRequest {
	head: RepoBranch;
	base: RepoBranch;
	body: string;
	html_url: string;
	mergeable: boolean;
	mergeable_state: string;
	number: number;
	state: string;
	url: string;
	user: User;
	requested_reviewers: User[];
}

export interface Reference {
	ref: string;
	url: string;
	object: {
		type: string;
		sha: string;
		url: string;
	};
}

export interface RepoBranch {
	ref: string;
	repo: Repo;
	sha: string;
}

export interface Repo {
	owner: {
		login: string;
	};
	name: string;
}

export interface RequiredStatusChecks {
	include_admins: boolean;
	strict: boolean;
	contexts: string[];
}

export interface Review {
	user: {
		login: string;
	};
	body: string;
	commit_id: string;
	state: string;
}

export interface Status {
	state: string;
	context: string;
}

export interface Tag {
	name: string;
	commit: {
		sha: string
	};
}

export interface Tree {
	sha: string;
	url: string;
	tree: TreeEntry[];
}

export interface TreeEntry {
	path: string;
	mode: string;
	type: string;
	sha: string;
	url?: string;
	size?: number;
}

export interface User {
	login: string;
	id: number;
	url: string;
	type: string;
	site_admin: string;
}
