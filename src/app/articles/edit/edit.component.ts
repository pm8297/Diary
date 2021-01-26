import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { Article } from '../article.model';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  form: FormGroup;
  slug: string;
  errTitle: [];
  errBody: [];
  errDes: [];
  token = window.localStorage.getItem('token');
  submit: boolean;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '100px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter content here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],

    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
  constructor(
    private fb: FormBuilder,
    private articlesService: ArticlesService,
    private router: Router,
    private ac: ActivatedRoute,
    private snackBarService: SnackBarService
  ) {
    this.slug = ac.snapshot.params.slug;
    if (this.slug) {
      articlesService
        .getDetailArticle(this.slug)
        .subscribe((s: { article: Article }) => {
          this.form = this.fb.group({
            article: this.fb.group({
              title: [s.article.title, Validators.required],
              description: [s.article.description, Validators.required],
              body: [s.article.body, Validators.required],
              tagList: this.fb.array([s.article.tagList]),
            }),
          });
        });
    } else {
      this.form = this.fb.group({
        article: this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          body: ['', Validators.required],
          tagList: this.fb.array([this.fb.control('')]),
        }),
      });
    }
  }
  ngOnInit() {}

  onSubmit() {
    this.submit = true;
    if (this.slug) {
      this.articlesService
        .updateArticle(this.slug, this.form.value)
        .subscribe((data: { article: Article }) => {
          this.slug = data.article.slug;
          this.router.navigateByUrl(`/articles/${this.slug}`);
          this.snackBarService.openSnackBar('Edit Article', 2, 'success');
        });
    } else {
      this.articlesService.addArticle(this.form.value).subscribe(
        (data: { article: Article }) => {
          this.slug = data.article.slug;
          this.router.navigateByUrl(`/articles/${this.slug}`);
          this.snackBarService.openSnackBar('Added Article', 2, 'success');
        },
        (error) => {
          this.snackBarService.openSnackBar('Added Article', 2, 'error');
        }
      );
    }
  }
}
